import { getArtistTopTracks } from "@/api/spotify/artistApi";
import { Track, TrackAnalysis } from "@/types/recommendTypes";
import useRecommendStore from "@/zustand/recommendStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SPINNER_TEXT from "@/constants/spinnerText";
import { RECOMMEND_HEADER_TEXT } from "@/constants/recommend";
import RecommendHeader from "./RecommendHeader";
import TrackItem from "./TrackItem";
import RecommendButton from "./RecommendButton";
import {
	getRecommendations,
	getTracksAudioFeatures,
} from "@/api/spotify/serviceApi";
import shuffleArray from "@/utils/shuffleArray";
import { uploadBill } from "@/api/supabase/playlistTableAccessApis";
import useUserStore from "@/zustand/userStore";
import getRandomColor from "@/utils/getRandomColor";
import { updateOwnTracklist } from "@/api/supabase/profilesTableAccessApis";
import useRecommendResultStore from "@/zustand/recommendResultStore";
import { Spinner } from "..";

export const INITIAL_ANALYSIS_OBJECT: TrackAnalysis = {
	acousticness: 0,
	energy: 0,
	valence: 0,
	danceability: 0,
	tempo: 0,
};

const TrackSelector = ({
	setIsMakingBillAnimate,
}: {
	setIsMakingBillAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const userInfo = useUserStore((state) => state.userInfo);
	const isLoggedIn = !!userInfo.id;
	const navigate = useNavigate();
	const initialStore = useRecommendStore((state) => state.initialStore);
	const {
		genre: genreIdStore,
		track: TrackIdStore,
		artist: artistIdStore,
	} = initialStore;
	const selectTrack = useRecommendStore((state) => state.selectTrack);
	const isSelectedTrack = (trackId: string) => TrackIdStore.includes(trackId);
	const isButtonDisabled = TrackIdStore.length === 0;
	const setResultBillId = useRecommendResultStore(
		(state) => state.setResultBillId,
	);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		if (initialStore.artist.length === 0) {
			navigate("/recommend/genre");
		}
	}, []);

	/** 좋아하는 가수 바탕으로 아티스트 탑 트랙을 배열로 불러와서 flat하게 만드는 쿼리 */
	const { data: topTracks, isLoading } = useQuery<Track[]>({
		queryKey: ["artistTracks", artistIdStore],
		queryFn: async () => {
			const promises = artistIdStore.map((item: string) => {
				return getArtistTopTracks(item);
			});
			const results = await Promise.all(promises);
			return results.flat();
		},
		enabled: !!artistIdStore,
	});

	if (isLoading) return <Spinner text={SPINNER_TEXT.TRACK_TEXT} />;

	/** 선택한 트랙 데이터를 이용해서 추천 데이터 가져오는 함수
	 * Get Recommendations은 seed params의 조합의 최대값이 5개이기때문에
	 * tracks를 stirng으로 전달하였음
	 */
	const getRecommendedTracks = async () => {
		const recommendResults = await getRecommendations({
			artists: shuffleArray(artistIdStore),
			genre: shuffleArray(genreIdStore),
			tracks: TrackIdStore[0],
		});

		return recommendResults;
	};

	const calculateAverageAnalysis = (
		tracksAudioFeatures: TrackAnalysis[],
		trackList: Track[],
	): TrackAnalysis => {
		const reduceAnalysisList = tracksAudioFeatures.reduce(
			(acc: TrackAnalysis, cur: TrackAnalysis) => {
				for (const key in acc) {
					acc[key] += cur[key];
				}
				return acc;
			},
			{ ...INITIAL_ANALYSIS_OBJECT },
		);

		if (!reduceAnalysisList) {
			throw new Error("분석 데이터 에러");
		}

		return Object.fromEntries(
			Object.entries(reduceAnalysisList).map(([key, value]) => [
				key,
				(value as number) / trackList.length,
			]),
		) as TrackAnalysis;
	};

	const uploadTrackListToSupabase = async (trackList: Track[]) => {
		try {
			const tracksAudioFeatures = await getTracksAudioFeatures(
				trackList.map((track) => track.id),
			);
			const averageAnalysis = calculateAverageAnalysis(
				tracksAudioFeatures,
				trackList,
			);
			const billId = await uploadBill({
				tracklist: trackList,
				analysis: averageAnalysis,
				owner: isLoggedIn
					? { userId: userInfo.id, username: userInfo.username }
					: null,
				color: isLoggedIn ? getRandomColor() : "#57FF57",
				name: isLoggedIn
					? `${userInfo.username}의 음악영수증 #${
							userInfo.own_tracklist ? userInfo.own_tracklist.length + 1 : 1
						}`
					: null,
			});
			return billId;
		} catch (error) {
			console.error(error);
			throw new Error("업로드 중 에러 발생");
		}
	};

	const createBillAndNavigate = async () => {
		try {
			setIsMakingBillAnimate(true);
			const billId = await uploadTrackListToSupabase(
				await getRecommendedTracks(),
			);

			if (isLoggedIn) {
				await updateOwnTracklist({
					prevOwnTracklist: userInfo.own_tracklist || [],
					billId,
					userId: userInfo.id,
				});
			} else {
				setResultBillId(billId!);
			}

			timerRef.current = window.setTimeout(() => {
				setIsMakingBillAnimate(false);
			}, 4000);
			if (isLoggedIn) {
				navigate(`/userbill/${billId}/${userInfo.id}`);
			} else {
				navigate(`/guestbill/${billId}`);
			}
		} catch (error) {
			console.log(error);
		}
		return () => clearTimeout(timerRef.current!);
	};

	return (
		<div>
			<RecommendHeader headerText={RECOMMEND_HEADER_TEXT.TRACK} />
			{topTracks &&
				topTracks.map((track: Track, idx) => (
					<TrackItem
						key={track.id + idx}
						id={track.id}
						track={track}
						onClick={selectTrack}
						isSelected={isSelectedTrack(track.id)}
					/>
				))}

			<RecommendButton
				isButtonDisabled={isButtonDisabled}
				onClick={createBillAndNavigate}
			/>
		</div>
	);
};

export default TrackSelector;

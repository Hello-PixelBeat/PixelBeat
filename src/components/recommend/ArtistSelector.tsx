import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RECOMMEND_HEADER_TEXT } from "@/constants/recommend";
import useRecommendStore from "@/zustand/recommendStore";
import { Artist, ArtistIdFromSpotify } from "@/types/recommendTypes";
import { getArtistId } from "@/api/supabase/playlistTableAccessApis";
import { getArtistInfo } from "@/api/spotify/artistApi";
import RecommendButton from "./RecommendButton";
import ArtistItem from "./ArtistItem";
import SPINNER_TEXT from "@/constants/spinnerText";
import RecommendHeader from "./RecommendHeader";
import { Spinner } from "..";

const ArtistSelector = () => {
	const navigate = useNavigate();
	const selectArtist = useRecommendStore((state) => state.selectArtist);
	const initialStore = useRecommendStore((state) => state.initialStore);
	const genreStore = initialStore.genre;
	const artistIdStore = initialStore.artist;
	const [selectedArtistIds, setSelectedArtistIds] = useState<string[] | null>(
		null,
	);
	const isArtistSelected = (artistId: string) =>
		artistIdStore.includes(artistId);
	const isButtonDisabled = artistIdStore.length === 0;

	const moveToNext = () => {
		navigate("/recommend/track");
	};

	useEffect(() => {
		if (initialStore.genre.length === 0) {
			navigate("/recommend/genre");
			return;
		}
	}, []);

	/** a - 장르로 슈퍼베이스에서 가수 id 가져오기 */
	const { data: artistIdsfromSupabase } = useQuery({
		queryKey: ["artistIdsFromSupabase", genreStore],
		queryFn: () => getArtistId(genreStore),
		enabled: !!genreStore,
	});

	/** b - 위에서 가져온 가수 id로 실제 데이터 가져오기 */
	const {
		data: artistInfoBySpotify,
		isLoading: isArtistIdsfromSupabaseLoading,
	} = useQuery({
		queryKey: ["detailData", selectedArtistIds],
		queryFn: () => getArtistInfo(selectedArtistIds),
		enabled: !!selectedArtistIds,
	});

	/** a => b 이후 받아온 spotify data state에 저장 후 렌더링
	 * 아이템 3개 미만이면 다 보여주고 데이터 제한 없이 보여주고
	 * 아이템 3개 이상이면 6개씩 잘라서 보여주기
	 */
	useEffect(() => {
		const getSelectedArtistIds = (artistIds: ArtistIdFromSpotify[]) => {
			if (genreStore.length < 3) {
				return artistIds?.map((item) => item.artist_id) || [];
			}

			const artistsByGenre: { [key: string]: string[] } = {};
			artistIds?.forEach((item) => {
				const genre = item.genre;
				artistsByGenre[genre] = artistsByGenre[genre] || [];
				artistsByGenre[genre].push(item.artist_id);
			});

			const selectedArtists: string[] = [];
			Object.values(artistsByGenre).forEach((artists) => {
				selectedArtists.push(...artists.slice(0, 6));
			});
			return selectedArtists;
		};

		if (artistIdsfromSupabase) {
			const selectedArtist = getSelectedArtistIds(artistIdsfromSupabase);
			setSelectedArtistIds(selectedArtist);
		}
	}, [artistIdsfromSupabase]);

	if (isArtistIdsfromSupabaseLoading || !artistInfoBySpotify)
		return <Spinner text={SPINNER_TEXT.ARTIST_TEXT} />;

	return (
		<div>
			<RecommendHeader headerText={RECOMMEND_HEADER_TEXT.ARTIST} />
			{artistInfoBySpotify &&
				artistInfoBySpotify.map((artist: Artist, idx: number) => (
					<ArtistItem
						key={artist.id + idx}
						artist={artist}
						isSelected={isArtistSelected(artist.id)}
						onClick={selectArtist}
					/>
				))}
			<RecommendButton
				isButtonDisabled={isButtonDisabled}
				onClick={moveToNext}
			/>
		</div>
	);
};

export default ArtistSelector;

import { setCurrentTrackAndPositionTable } from "@/api/supabase/profilesTableAccessApis";
import { Track } from "@/types/recommendTypes";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useUpdateProfileMutation from "./useUpdateUserInfoMutation";
import { shallow } from "zustand/shallow";

const usePlayerControls = () => {
	const { pathname } = useLocation();
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
	const userInfo = useUserStore((state) => state.userInfo);

	const [
		isPlaying,
		tracks,
		setIsPlaying,
		setPlayingPosition,
		setCurrentTrack,
		currentTrack,
	] = usePlayNowStore(
		useShallow((state) => [
			state.isPlaying, // 재생 상태 (boolean)
			state.tracks, // 전체 트랙 (array)
			state.setIsPlaying, // 재생 상태 변경 (play | pause)
			state.setPlayingPosition, // progress position
			state.setCurrentTrack, // 현재 재생트랙 지정
			state.currentTrack,
		]),
	);

	const { mutate: setCurrentTrackAndPositionTableMutation } =
		useUpdateProfileMutation(setCurrentTrackAndPositionTable);

	// 음악 재생
	const startPlayback = () => {
		setIsPlaying(true);
		audioRef.current?.play();

		intervalIdRef.current = setInterval(() => {
			const currentTrack = usePlayNowStore.getState().currentTrack;
			const tracks = usePlayNowStore.getState().tracks;

			const isLastSong =
				tracks
					.filter((item) => !!item.preview_url)
					.findIndex((track) => track.id === currentTrack?.id) ===
				tracks.length - 1;

			if (audioRef.current?.duration) {
				setPlayingPosition(
					Math.round(
						(audioRef.current?.currentTime! / audioRef.current?.duration!) *
							10000,
					) / 100,
				);
			}
			// 재생 끝나면 다음곡 재생
			if (audioRef.current?.ended) {
				if (isLastSong) {
					pausePlayback();
					setCurrentTrack(null);
					setPlayingPosition(0);
					setIsPlaying(false);
				}
				setCurrentTrack(
					tracks[
						tracks.findIndex((track) => track.id === currentTrack!.id) + 1
					],
				);
			}
		}, 100);
	};

	// 음악 정지
	const pausePlayback = () => {
		const currentTrack = usePlayNowStore.getState().currentTrack;
		const playingPosition = usePlayNowStore.getState().playingPosition;
		setIsPlaying(false);
		audioRef.current!.pause();
		clearInterval(intervalIdRef.current!);

		if (userInfo.id) {
			setCurrentTrackAndPositionTableMutation({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				track: currentTrack,
				playingPosition,
				userId: userInfo.id,
			});
		}
	};

	// 음악 변경 후 재생
	const updatePlayback = (newTrack?: Track) => {
		const currentPlayingTrack = usePlayNowStore.getState().currentTrack;

		if (newTrack) setCurrentTrack(newTrack);
		const trackToPlay = newTrack || currentPlayingTrack;
		audioRef.current!.src = trackToPlay?.preview_url!;

		setPlayingPosition(0);
		audioRef.current!.load();

		audioRef.current!.addEventListener("canplay", () => {
			startPlayback();
		});
	};

	// 재생 버튼 클릭 토글
	const handleClickPlayButton = useCallback(() => {
		if (isPlaying) {
			pausePlayback();
		} else {
			startPlayback();
		}
	}, [isPlaying, tracks, setIsPlaying, setPlayingPosition, setCurrentTrack]);

	// 이전 곡 재생 버튼
	const handleClickPrevButton = () => {
		const currentTrack = usePlayNowStore.getState().currentTrack;
		const tracks = usePlayNowStore.getState().tracks;
		const isFirstTrack: boolean = tracks.indexOf(currentTrack!) === 0;

		// 재생 위치 초기화
		setPlayingPosition(0);

		// 이전 곡 설정
		setCurrentTrack(
			isFirstTrack
				? tracks[tracks.length - 1]
				: tracks[
						tracks.findIndex((track) => track.id === currentTrack!.id) - 1
					],
		);
	};

	// 다음 곡 재생 버튼
	const handleClickNextButton = () => {
		const currentTrack = usePlayNowStore.getState().currentTrack;
		const tracks = usePlayNowStore.getState().tracks;

		const isLastTrack =
			tracks.findIndex((track) => track.id === currentTrack!.id) ===
			tracks.length - 1;

		setPlayingPosition(0);
		setCurrentTrack(
			isLastTrack
				? tracks[0]
				: tracks[
						tracks.findIndex((track) => track.id === currentTrack!.id) + 1
					],
		);
	};

	// 플레이백 변경 감지, 재생목록에서 마우스 이벤트로 currentTrack이 바뀌는 경우
	useEffect(() => {
		if (audioRef.current) {
			const unsubscribe = usePlayNowStore.subscribe(
				(state) => state.currentTrack,
				(currentTrack) => {
					const isSrcChanged =
						currentTrack &&
						currentTrack?.preview_url !== audioRef.current?.src!;

					if (isSrcChanged) {
						updatePlayback();
						if (userInfo.id) {
							const userInfo = useUserStore.getState().userInfo;
							setCurrentTrackAndPositionTableMutation({
								prevNowPlayTracklist: userInfo.nowplay_tracklist,
								track: currentTrack,
								playingPosition: 0,
								userId: userInfo.id,
							});
						}
					}
				},
				{ equalityFn: shallow },
			);
			return unsubscribe;
		}
	}, [updatePlayback, userInfo.id]);

	// 라우터 변경시 db update
	useEffect(() => {
		if (pathname && userInfo.id) {
			const userInfo = useUserStore.getState().userInfo;
			const currentTrack = usePlayNowStore.getState().currentTrack;
			const playingPosition = usePlayNowStore.getState().playingPosition;

			setCurrentTrackAndPositionTableMutation({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				track: currentTrack,
				playingPosition,
				userId: userInfo.id,
			});
		}
	}, [pathname]);

	return {
		handleClickPlayButton,
		handleClickNextButton,
		handleClickPrevButton,
		audioRef,
		intervalIdRef,
		startPlayback,
		currentTrack,
		isPlaying,
	};
};

export default usePlayerControls;

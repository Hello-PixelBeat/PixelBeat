import { useCallback, useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";
import { Track } from "@/types/recommendTypes";
import { shallow } from "zustand/shallow";

const usePlayerControlsMusicDrawer = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

	const [
		isPlaying,
		tracks,
		setIsPlaying,
		setPlayingPosition,
		setCurrentTrack,
		currentTrack,
	] = useMusicDrawerStore(
		useShallow((state) => [
			state.isPlaying_MusicDrawer,
			state.tracks_MusicDrawer,
			state.setIsPlaying_MusicDrawer,
			state.setPlayingPosition_MusicDrawer,
			state.setCurrentTrack_MusicDrawer,
			state.currentTrack_MusicDrawer,
		]),
	);

	// 음악 재생
	const startPlayback = useCallback(() => {
		setIsPlaying(true);
		audioRef.current?.play();

		intervalIdRef.current = setInterval(() => {
			const currentTrack =
				useMusicDrawerStore.getState().currentTrack_MusicDrawer;
			const tracks = useMusicDrawerStore.getState().tracks_MusicDrawer;

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
	}, [tracks, setIsPlaying, setCurrentTrack]);

	// 음악 정지
	const pausePlayback = useCallback(() => {
		setIsPlaying(false);
		audioRef.current!.pause();
		clearInterval(intervalIdRef.current!);
	}, [setIsPlaying]);

	// 음악 변경 후 재생
	const updatePlayback = useCallback(
		(newTrack?: Track) => {
			const currentPlayingTrack =
				useMusicDrawerStore.getState().currentTrack_MusicDrawer;
			if (!currentPlayingTrack) return;
			if (newTrack) setCurrentTrack(newTrack);

			const trackToPlay = newTrack || currentPlayingTrack;
			audioRef.current!.src = trackToPlay?.preview_url!;

			setPlayingPosition(0);
			audioRef.current?.load();

			audioRef.current?.addEventListener("canplay", () => {
				startPlayback();
			});
		},
		[setCurrentTrack, setPlayingPosition, startPlayback],
	);

	// 재생 버튼 클릭 토글
	const handleClickPlayButton = useCallback(() => {
		if (isPlaying) {
			pausePlayback();
		} else {
			startPlayback();
		}
	}, [isPlaying, tracks, setIsPlaying, setPlayingPosition, setCurrentTrack]);

	// 이전 곡 재생 버튼
	const handleClickPrevButton = useCallback(() => {
		const currentTrack =
			useMusicDrawerStore.getState().currentTrack_MusicDrawer;
		const tracks = useMusicDrawerStore.getState().tracks_MusicDrawer;
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
	}, [setCurrentTrack, setPlayingPosition]);

	// 다음 곡 재생 버튼
	const handleClickNextButton = useCallback(() => {
		const currentTrack =
			useMusicDrawerStore.getState().currentTrack_MusicDrawer;
		const tracks = useMusicDrawerStore.getState().tracks_MusicDrawer;

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
	}, [setCurrentTrack, setPlayingPosition]);

	// 플레이백 변경 감지, 음악목록에서 마우스 이벤트로 currentTrack이 바뀌는 경우
	useEffect(() => {
		if (audioRef.current) {
			const unsubscribe = useMusicDrawerStore.subscribe(
				(state) => state.currentTrack_MusicDrawer,
				(currentTrack) => {
					const isSrcChanged =
						currentTrack &&
						currentTrack?.preview_url !== audioRef.current?.src!;
					if (isSrcChanged) {
						updatePlayback();
					}
				},
				{
					equalityFn: shallow,
				},
			);

			return unsubscribe;
		}
	}, [updatePlayback]);

	useEffect(() => {
		return () => {
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
			audioRef.current = null;
		};
	}, []);

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

export default usePlayerControlsMusicDrawer;

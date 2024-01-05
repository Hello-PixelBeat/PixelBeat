import { setCurrentTrackAndPositionTable } from "@/api/supabase/profilesTableAccessApis";
import { Track } from "@/types/recommendTypes";
import { usePlayNowStore } from "@/zustand/playNowStore";
import { useUserStore } from "@/zustand/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const usePlayerControls = () => {
	const { pathname } = useLocation();
	const queryClient = useQueryClient();
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
	const userInfo = useUserStore((state) => state.userInfo);
	const {
		isPlaying, // 재생 상태 (boolean)
		tracks, // 전체 트랙 (배열)
		setIsPlaying, // 재생 상태 변경 (play | pause)
		setPlayingPosition,
		setCurrentTrack, // 현재 재생트랙 지정
	} = usePlayNowStore();

	const setCurrentTrackAndPositionTableMutation = useMutation({
		mutationFn: setCurrentTrackAndPositionTable,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userInfo.id],
			});
		},
		onError(error) {
			console.log(error);
		},
	});

	// 음악 재생
	const startPlayback = () => {
		setIsPlaying(true);
		audioRef.current?.play();

		intervalIdRef.current = setInterval(() => {
			const { currentTrack, tracks } = usePlayNowStore.getState();
			const isLastSong =
				tracks
					.filter((item) => !!item.preview_url)
					.findIndex((track) => track.id === currentTrack!.id) ===
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
		const { playingPosition, currentTrack } = usePlayNowStore.getState();
		setIsPlaying(false);
		audioRef.current!.pause();
		clearInterval(intervalIdRef.current!);

		if (userInfo.id) {
			setCurrentTrackAndPositionTableMutation.mutateAsync({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				track: currentTrack,
				playingPosition,
				userId: userInfo.id,
			});
		}
	};

	// 음악 변경 후 재생
	const updatePlayback = (newTrack?: Track) => {
		const { currentTrack: currentPlayingTrack } = usePlayNowStore.getState();

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
		const { currentTrack, tracks } = usePlayNowStore.getState();
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
		const { currentTrack, tracks } = usePlayNowStore.getState();

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
			const unsubscribe = usePlayNowStore.subscribe((state) => {
				const isSrcChanged =
					state.currentTrack &&
					state.currentTrack?.preview_url !== audioRef.current?.src!;

				if (isSrcChanged) {
					updatePlayback();
					if (userInfo.id) {
						const { userInfo } = useUserStore.getState();
						setCurrentTrackAndPositionTableMutation.mutateAsync({
							prevNowPlayTracklist: userInfo.nowplay_tracklist,
							track: state.currentTrack,
							playingPosition: 0,
							userId: userInfo.id,
						});
					}
				}
			});
			return unsubscribe;
		}
	}, []);

	// 라우터 변경시 db update
	useEffect(() => {
		if (pathname && userInfo.id) {
			const { userInfo } = useUserStore.getState();
			const { currentTrack, playingPosition } = usePlayNowStore.getState();

			setCurrentTrackAndPositionTableMutation.mutateAsync({
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
	};
};

export default usePlayerControls;

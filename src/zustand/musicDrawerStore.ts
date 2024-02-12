import { NowPlayList_MusicDrawer, Track } from "@/types/recommendTypes";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

// 초기 상태
const initialStore: NowPlayList_MusicDrawer = {
	tracks_MusicDrawer: [],
	currentTrack_MusicDrawer: null,
	isPlaying_MusicDrawer: false,
	playingPosition_MusicDrawer: 0,
	isMusicDrawer: false,
};

// 상태 및 액션 정의
type MusicDrawerStore = NowPlayList_MusicDrawer & {
	setMusicDrawerStore: (nowPlayList: NowPlayList_MusicDrawer) => void;
	setCurrentTrack_MusicDrawer: (track: Track | null) => void;
	setPlayingPosition_MusicDrawer: (playingPosition: number) => void;
	setNowPlayList_MusicDrawer: (tracklist: Track[]) => void;
	setIsPlaying_MusicDrawer: (isPlaying: boolean) => void;
	setIsMusicDrawer: (isMusicDrawer: boolean) => void;
	resetStore: () => void;
};

const useMusicDrawerStore = create(
	subscribeWithSelector(
		persist<MusicDrawerStore>(
			(set) => ({
				...initialStore,
				//전체 상태 지정
				setMusicDrawerStore: (nowPlayList: NowPlayList_MusicDrawer) => {
					set((state: NowPlayList_MusicDrawer) => ({
						...state,
						tracks_MusicDrawer: nowPlayList.tracks_MusicDrawer,
						currentTrack_MusicDrawer: nowPlayList.currentTrack_MusicDrawer,
						playingPosition_MusicDrawer:
							nowPlayList.playingPosition_MusicDrawer,
					}));
				},
				//현재 재생트랙 지정
				setCurrentTrack_MusicDrawer: (track: Track | null) => {
					set((state: NowPlayList_MusicDrawer) => ({
						...state,
						currentTrack_MusicDrawer: track,
					}));
				},
				//재생 및 정지
				setIsPlaying_MusicDrawer: (isPlaying: boolean) => {
					set((state: NowPlayList_MusicDrawer) => {
						return {
							...state,
							isPlaying_MusicDrawer: isPlaying,
						};
					});
				},
				setPlayingPosition_MusicDrawer: (playingPosition: number) => {
					set((state: NowPlayList_MusicDrawer) => {
						return {
							...state,
							playingPosition_MusicDrawer: playingPosition,
						};
					});
				},

				//재생목록 지정
				setNowPlayList_MusicDrawer: (tracklist: Track[]) => {
					set((state: NowPlayList_MusicDrawer) => ({
						...state,
						tracks_MusicDrawer: tracklist.filter((track) => track.preview_url),
					}));
				},

				resetStore: () => {
					set((state: NowPlayList_MusicDrawer) => ({
						...state,
						...initialStore,
					}));
				},
				setIsMusicDrawer: (isMusicDrawer: boolean) => {
					set((state: NowPlayList_MusicDrawer) => ({
						...state,
						isMusicDrawer: isMusicDrawer,
					}));
				},
			}),
			{ name: "music_drawer" }, // 로컬 스토리지에 저장될 키
		),
	),
);

export default useMusicDrawerStore;

import { NowPlayList, Track } from "@/types/recommendTypes";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const initialStore: NowPlayList = {
	tracks: [],
	currentTrack: null,
	isPlaying: false,
	playingPosition: 0,
};

type NowPlayStore = NowPlayList & {
	setNowPlayStore: (nowPlayList: NowPlayList) => void;
	setCurrentTrack: (track: Track | null) => void;
	setPlayingPosition: (playingPosition: number) => void;
	addTrackToNowPlay: (track: Track) => void;
	deleteTrackToNowPlay: (trackId: string) => void;
	setOrderNowPlay: (tracklist: Track[]) => void;
	setNowPlayList: (tracklist: Track[]) => void;
	setIsPlaying: (isPlaying: boolean) => void;
	reset: () => void;
};

const playNowStore = (set: any) => ({
	...initialStore,
	//전체 상태 지정
	setNowPlayStore: (nowPlayList: NowPlayList) =>
		set((state: NowPlayList) => ({
			...state,
			tracks: nowPlayList.tracks,
			currentTrack: nowPlayList.currentTrack,
			playingPosition: nowPlayList.playingPosition,
		})),

	//현재 재생트랙 지정
	setCurrentTrack: (track: Track | null) =>
		set((state: NowPlayList) => ({
			...state,
			currentTrack: track,
		})),

	//재생 및 정지
	setIsPlaying: (isPlaying: boolean) =>
		set((state: NowPlayList) => {
			return {
				...state,
				isPlaying: isPlaying,
			};
		}),
	setPlayingPosition: (playingPosition: number) =>
		set((state: NowPlayList) => {
			return {
				...state,
				playingPosition: playingPosition,
			};
		}),

	//재생목록 지정
	setNowPlayList: (tracklist: Track[]) =>
		set((state: NowPlayList) => ({
			...state,
			tracks: tracklist,
		})),
	//재생목록 추가
	addTrackToNowPlay: (track: Track) =>
		set((state: NowPlayList) => ({
			...state,
			tracks: [track, ...state.tracks],
		})),
	//재생목록 삭제
	deleteTrackToNowPlay: (trackId: string) =>
		set((state: NowPlayList) => ({
			...state,
			tracks: state.tracks.filter((track: Track) => track.id !== trackId),
		})),
	//재생목록 순서 수정
	setOrderNowPlay: (tracklist: Track[]) =>
		set((state: NowPlayList) => ({
			...state,
			tracks: tracklist,
		})),
	reset: () => {
		set((state: NowPlayList) => ({
			...state,
			...initialStore,
		}));
	},
});

const usePlayNowStore = create<NowPlayStore>()(
	subscribeWithSelector(playNowStore),
);

export default usePlayNowStore;

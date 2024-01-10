import { NowPlayList } from "@/types/recommendTypes";
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialStore: User = {
	id: "",
	username: "",
	introduce: "",
	nowplay_tracklist: {
		tracks: [],
		currentTrack: null,
		playingPosition: 0,
	},
	avatar_url: "",
	isPremium: false,
	own_tracklist: [],
	saved_tracklist: [],
	liked_tracklist: [],
};

type UserStore = {
	userInfo: User;
	setUserInfo: (userInfo: User) => void;
	setNowPlayState: (nowPlayList: NowPlayList) => void;
	resetUserInfo: () => void;
};

const useUserStore = create(
	persist<UserStore>(
		(set) => ({
			userInfo: initialStore,
			setUserInfo: (userInfo: User) =>
				set((state) => ({
					...state,
					userInfo: userInfo,
				})),
			setNowPlayState: (nowPlayList: NowPlayList) =>
				set((state) => ({
					...state,
					userInfo: { ...state.userInfo, nowplay_tracklist: nowPlayList },
				})),
			resetUserInfo: () =>
				set((state) => ({
					...state,
					userInfo: initialStore,
				})),
		}),
		{
			name: "userInfoFromDatabase",
		},
	),
);
export default useUserStore;
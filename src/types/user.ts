import { NowPlayList } from "./recommendTypes";

export type user_id = string;
export type user_name = string;
export type tracklist_id = string;

export interface User {
	id: user_id;
	username: user_name;
	introduce: string;
	nowplay_tracklist: NowPlayList;
	avatar_url: string;
	isPremium: boolean;
	own_tracklist: tracklist_id[];
	saved_tracklist: tracklist_id[];
	liked_tracklist: tracklist_id[];
}

export interface UserMin {
	userId: user_id;
	username: user_name;
}

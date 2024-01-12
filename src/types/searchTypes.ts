import { Album, Artist, Track } from "./recommendTypes";

export interface SearchedData {
	tracks: Track[];
	artists: Artist[];
	playlists: any;
	albums: Album[]
}

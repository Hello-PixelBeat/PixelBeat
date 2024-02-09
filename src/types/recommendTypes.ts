import { UserMin, tracklist_id } from "./user";

export interface Artist {
	external_urls: {
		spotify: string;
	};
	followers: {
		href: null;
		total: number;
	};
	genres: string[];
	href: string;
	id: string;
	images: {
		height: number;
		url: string;
		width: number;
	}[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
}

export interface ArtistItemProps {
	artist: Artist;
	isSelected: boolean;
	onClick: (id: string) => void;
}

export interface ArtistIdFromSpotify {
	artist_id: string;
	artist_name: string;
	genre: string;
	id: number;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface Album {
	id: string;
	images: Image[];
	is_playable: boolean;
	name: string;
	release_date: string;
}

export interface Track {
	album: Album;
	artists: Artist[];
	duration_ms: number;
	id: string;
	is_playable: boolean;
	name: string;
	preview_url: string;
}

export interface TrackAnalysis {
	[key: string]: number;
}

//현재재생목록
export interface NowPlayList {
	tracks: Track[];
	currentTrack: Track | null;
	isPlaying?: boolean;
	playingPosition: number;
}

// 현재재생목록_음악 서랍
export interface NowPlayList_MusicDrawer {
	tracks_MusicDrawer: Track[];
	currentTrack_MusicDrawer: Track | null;
	isPlaying_MusicDrawer?: boolean;
	playingPosition_MusicDrawer: number;
	isMusicDrawer: boolean;
}

export interface TrackList {
	name?: string;
	id: tracklist_id;
	tracks: Track[];
	created_at: Date;
	owner?: UserMin;
	likes?: number;
	analysis?: TrackAnalysis;
	color?: string;
}

// TOP50
interface ExternalUrls {
	spotify: string;
}
interface AddedBy {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	type: string;
	uri: string;
}
interface VideoThumbnail {
	url: string | null;
}

export interface Top50TrackProps {
	added_at: string;
	added_by: AddedBy;
	is_local: boolean;
	primary_color: string | null;
	track: Track;
	video_thumbnail: VideoThumbnail;
}

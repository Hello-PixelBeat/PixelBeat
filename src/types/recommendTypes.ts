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
  tracks: Track[]
  currentTrack: Track | null
  isPlaying?: boolean
  playingPosition: number
}

import { Artist } from "./recommendTypes";

export interface MusicPlayerFullScreenProps {
	playAndPauseNowPlay: () => void;
	clickPrevButton: () => void;
	clickNextButton: () => void;
	audioRef: React.RefObject<HTMLAudioElement>;
}

export interface MusicPlayerBarProps {
	propsClassName?: string;
}

export interface PlayerControlsProps {
	handleClickPrevButton: (e: React.MouseEvent<HTMLSpanElement>) => void;
	handleClickPlayButton: (e: React.MouseEvent<HTMLSpanElement>) => void;
	handleClickNextButton: (e: React.MouseEvent<HTMLSpanElement>) => void;
	isPlaying: boolean | undefined;
}

export interface TrackInfoProps {
	name: string;
	artists: Artist[];
}

import Kpop from "@/assets/svgs/Kpop.svg?react";
import Acoustic from "@/assets/svgs/Acoustic.svg?react";
import Animation from "@/assets/svgs/Animation.svg?react";
import Blues from "@/assets/svgs/Blues.svg?react";
import Chill from "@/assets/svgs/Chill.svg?react";
import Classic from "@/assets/svgs/Classic.svg?react";
import Dance from "@/assets/svgs/Dance.svg?react";
import Electonic from "@/assets/svgs/Electonic.svg?react";
import Hiphop from "@/assets/svgs/Hiphop.svg?react";
import Indie from "@/assets/svgs/Indie.svg?react";
import Jazz from "@/assets/svgs/Jazz.svg?react";
import Kid from "@/assets/svgs/Kid.svg?react";
import Movie from "@/assets/svgs/Movie.svg?react";
import Pop from "@/assets/svgs/Pop.svg?react";
import RnB from "@/assets/svgs/RnB.svg?react";
import Rock from "@/assets/svgs/Rock.svg?react";
import WorkOut from "@/assets/svgs/WorkOut.svg?react";
import Jpop from "@/assets/svgs/Jpop.svg?react";

export const FAVORITE_GENRE_TEXT = [
	"R&B",
	"어쿠스틱",
	"애니메이션",
	"블루스",
	"CHILL",
	"클래식",
	"댄스",
	"EDM",
	"힙합",
	"인디",
	"재즈",
	"어린이",
	"영화",
	"팝",
	"ROCK",
	"J-POP",
	"K-POP",
	"WORK-OUT",
];

export const FAVORITE_GENRE_ICON_MAPPING: { [key: string]: any } = {
	"R&B": <RnB className="genre-icon-size" />,
	어쿠스틱: <Acoustic className="genre-icon-size" />,
	애니메이션: <Animation className="genre-icon-size" />,
	블루스: <Blues className="genre-icon-size" />,
	CHILL: <Chill className="genre-icon-size" />,
	클래식: <Classic className="genre-icon-size" />,
	댄스: <Dance className="genre-icon-size" />,
	EDM: <Electonic className="genre-icon-size" />,
	힙합: <Hiphop className="genre-icon-size" />,
	인디: <Indie className="genre-icon-size" />,
	재즈: <Jazz className="genre-icon-size" />,
	"K-POP": <Kpop className="genre-icon-size" />,
	"J-POP": <Jpop className="genre-icon-size" />,
	어린이: <Kid className="genre-icon-size" />,
	영화: <Movie className="genre-icon-size" />,
	팝: <Pop className="genre-icon-size" />,
	ROCK: <Rock className="genre-icon-size" />,
	"WORK-OUT": <WorkOut className="genre-icon-size" />,
};

export const RECOMMEND_HEADER_TEXT = Object.freeze({
	COUNT: ["(최대 5개)"],
	GENRE: ["좋아하는 음악 장르"],
	ARTIST: ["좋아하는 아티스트"],
	TRACK: ["좋아하는 음악"],
});

export const GENRE_CATEGORY: { [key: string]: string } = Object.freeze({
	"K-POP": "k-pop",
	어쿠스틱: "acoustic",
	팝: "pop",
	힙합: "hip-hop",
	"R&B": "r-n-b",
	CHILL: "chill",
	클래식: "classical",
	재즈: "jazz",
	영화: "movies",
	ROCK: "rock",
	댄스: "dance",
	애니메이션: "anime",
	어린이: "kids",
	EDM: "edm",
	블루스: "blues",
	"J-POP": "j-pop",
	인디: "indie",
	"WORK-OUT": "work-out",
});

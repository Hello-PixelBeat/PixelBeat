import PixelBorder from "@/assets/svgs/PixelBorder.svg?react";
import {
	FAVORITE_GENRE_ICON_MAPPING,
	GENRE_CATEGORY,
} from "@/constants/recommend";

interface GenreItemProps {
	item: string;
	onClick: (item: string) => void;
	isSelected: boolean;
}

const GenreItem = ({ item, onClick, isSelected }: GenreItemProps) => (
	<div
		onClick={() => onClick(GENRE_CATEGORY[item])}
		className={`cursor-pointer ${isSelected ? "text-mainGreen" : ""}`}
	>
		<div className="relative">
			<div className="genre-icon-position">
				{FAVORITE_GENRE_ICON_MAPPING[item]}
			</div>
			<div className="genre-text-size">{item}</div>
			<PixelBorder className="relative" />
		</div>
	</div>
);

export default GenreItem;

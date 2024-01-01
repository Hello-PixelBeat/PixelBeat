import { useNavigate } from "react-router-dom";
import {
	RECOMMEND_HEADER_TEXT,
	FAVORITE_GENRE_TEXT,
	GENRE_CATEGORY,
} from "@/constants/recommend";
import useRecommendStore from "@/zustand/recommendStore";
import GenreItem from "./GenreItem";
import RecommendButton from "./RecommendButton";
import RecommendHeader from "./RecommendHeader";

const GenreSelector = () => {
	const navigate = useNavigate();
	const genreSelect = useRecommendStore((state) => state.selectGenre);
	const initialStore = useRecommendStore((state) => state.initialStore);
	const genreStore = initialStore.genre;

	const isButtonDisabled = genreStore.length === 0;

	const moveToNext = () => {
		navigate("/recommend/artist");
	};

	return (
		<>
			<RecommendHeader headerText={RECOMMEND_HEADER_TEXT.GENRE} />
			<div className="genre-selector-container">
				{FAVORITE_GENRE_TEXT.map((item: string, idx: number) => (
					<GenreItem
						key={item + idx}
						item={item}
						onClick={genreSelect}
						isSelected={genreStore.includes(GENRE_CATEGORY[item])}
					/>
				))}
			</div>
			<RecommendButton
				isButtonDisabled={isButtonDisabled}
				onClick={moveToNext}
			/>
		</>
	);
};

export default GenreSelector;

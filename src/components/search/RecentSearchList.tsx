import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Xbutton } from "..";

interface RecentSearchListProps {
	onClickRecentSearchToggle: () => void;
	setInput: (query: string) => void;
	storeRecentSearchInput: (input: string) => void;
}

const RecentSearchList = ({
	onClickRecentSearchToggle,
	setInput,
	storeRecentSearchInput,
}: RecentSearchListProps) => {
	const navigate = useNavigate();
	const [decodedRecentSearchList, setDecodedRecentSearchList] = useState<
		string[]
	>([]);

	useEffect(() => {
		const storedRecentSearchList = localStorage.getItem("recent") || "[]";
		const decodedList = JSON.parse(storedRecentSearchList).map(
			(query: string) => decodeURIComponent(query),
		);
		setDecodedRecentSearchList(decodedList);
	}, []);

	const handleNavigateToResults = (query: string) => {
		navigate({
			pathname: "/search",
			search: `?q=${query}`,
		});
		setInput(query);
		storeRecentSearchInput(query);
		onClickRecentSearchToggle();
	};

	const handleDeleteSearchQuery = (event: any, index: number) => {
		event.stopPropagation();

		const updatedQueries = [...decodedRecentSearchList];
		updatedQueries.splice(index, 1);
		localStorage.setItem("recent", JSON.stringify(updatedQueries));
		setDecodedRecentSearchList(updatedQueries);
	};

	return (
		<div className="absolute top-70 z-30 w-[350px] rounded bg-mainBlack p-4 desktop:w-[600px]">
			<div className="mb-5 px-8 pt-4 text-white">최근 검색 기록</div>

			{decodedRecentSearchList.length > 0 ? (
				<ul className="m-0 list-none p-0">
					{decodedRecentSearchList.map((item, idx) => (
						<li
							onClick={() => handleNavigateToResults(item)}
							key={idx}
							className="hover:search-item-hover z-30 mb-1 cursor-pointer px-8 py-4"
						>
							<Xbutton
								className={
									"absolute right-20 mt-3 w-18 h-18 desktop:w-30 desktop:h-30 hover:search-item-hover"
								}
								deleteItem={(event: any) => handleDeleteSearchQuery(event, idx)}
							/>
							{item}
						</li>
					))}
				</ul>
			) : (
				<div className="px-8 py-4 text-mainGray">검색 기록이 없습니다.</div>
			)}
		</div>
	);
};

export default RecentSearchList;

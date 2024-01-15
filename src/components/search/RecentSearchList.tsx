import { Xbutton } from "..";
import useSearchStore from "@/zustand/searchStore";

interface RecentSearchListProps {
	handleRecentSearchToggle: any;
	handleNavigateToResults: any;
}

const RecentSearchList = ({
	handleNavigateToResults,
	handleRecentSearchToggle,
}: RecentSearchListProps) => {
	const searchList = useSearchStore((state) => state.searchList);
	const deleteKeyword = useSearchStore((state) => state.deleteKeyword);
	const deleteAll = useSearchStore((state) => state.deleteAll);

	const searchToKeyword = (query: string) => {
		handleNavigateToResults(query);
		handleRecentSearchToggle(false);
	};

	const handleDeleteSearchQuery = (event: React.MouseEvent, index: number) => {
		event.stopPropagation();
		deleteKeyword(index);
	};

	return (
		<div className="absolute top-70 z-30 w-[350px] rounded bg-mainBlack p-4 desktop:w-[600px]">
			<div className="mb-5 flex justify-between px-8 pt-4 text-white">
				<p>최근 검색 기록</p>
				<button className="hover:text-mainGreen" onClick={deleteAll}>
					전체 삭제
				</button>
			</div>

			{searchList.length > 0 ? (
				<ul className="m-0 list-none p-0">
					{searchList.map((item: string, idx: any) => (
						<li
							onClick={() => searchToKeyword(item)}
							key={idx}
							className="hover:search-item-hover z-30 mb-1 cursor-pointer px-8 py-4"
						>
							<Xbutton
								className={
									"absolute right-20 mt-3 h-18 w-18 hover:text-mainGreen desktop:h-30 desktop:w-30"
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

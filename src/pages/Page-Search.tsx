import SearchBar from "@/components/search/SearchBar";
import SearchResultWrap from "@/components/search/SearchResultWrap";
import { useState } from "react";

const Search = () => {
	const [recentSearchToggle, setRecentSearchToggle] = useState<boolean>(true);

	const handleSearchBar = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLInputElement;
		if (target.tagName !== "INPUT") {
			setRecentSearchToggle(false);
		}
	};

	return (
		<div
			onClick={handleSearchBar}
			className={`relative h-[100svh] overflow-y-auto px-20 desktop:px-60`}
		>
			<SearchBar
				searchBarState={recentSearchToggle}
				handleSearchBarToggle={setRecentSearchToggle}
			/>
			<SearchResultWrap />
		</div>
	);
};

export default Search;

import SearchBar from "@/components/search/SearchBar";
import SearchResultWrap from "@/components/search/SearchResultWrap";

const Search = () => {
	return (
		<div className={`relative h-[100svh] overflow-y-auto px-20 desktop:px-60`}>
			<SearchBar />
			<SearchResultWrap />
		</div>
	);
};

export default Search;

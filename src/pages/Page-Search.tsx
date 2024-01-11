import NavBar from "@/components/common/NavBar";
import SearchBar from "@/components/search/SearchBar";
import SearchResultWrap from "@/components/search/SearchResultWrap";

const Search = () => {
	return (
		<div className="relative h-screen overflow-y-auto">
			<SearchBar />
      <SearchResultWrap />
			<NavBar />
		</div>
	);
};

export default Search;

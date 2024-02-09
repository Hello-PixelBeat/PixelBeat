import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import usePlayNowStore from "@/zustand/playNowStore";
import { SearchedData } from "@/types/searchTypes";
import { searchItem } from "@/api/spotify/searchApi";
import SearchResultTrack from "./SearchResultTrack";
import SearchResultArtist from "./SearchResultArtist";
import SearchResultPlaylist from "./SearchResultPlaylist";
import SearchResultAlbum from "./SearchResultAlbum";
import SPINNER_TEXT from "@/constants/spinnerText";
import { Spinner } from "..";

const SearchResultWrap = () => {
	const [query] = useSearchParams();
	const queryValue = query.get("q") as string;
  const decodedQueryValue = encodeURIComponent(queryValue);
	const currentTrack = usePlayNowStore((state) => state.currentTrack);

	const { isLoading, data } = useQuery<
		SearchedData | Error,
		Error,
		SearchedData
	>({
		queryKey: ["search", queryValue],
		queryFn: () => searchItem(decodedQueryValue),
		refetchOnMount: false,
		enabled: !!queryValue,
	});

	return (
		<>
			{isLoading && <Spinner text={SPINNER_TEXT.SEARCH_TEXT} />}

			{data && (
				<div className="relative mt-58">
					<SearchResultTrack tracks={data?.tracks} />
				</div>
			)}

			{data && (
				<div className="relative mt-28">
					<SearchResultArtist artists={data.artists} />
				</div>
			)}

			{data && (
				<div className="relative mt-28">
					<SearchResultPlaylist playlists={data.playlists} />
				</div>
			)}

			{data && (
				<div
					className={`relative mt-28 ${currentTrack ? "mb-170" : "mb-100"} `}
				>
					<SearchResultAlbum albums={data.albums} />
				</div>
			)}
		</>
	);
};

export default SearchResultWrap;

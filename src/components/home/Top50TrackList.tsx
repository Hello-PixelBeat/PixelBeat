import getPlaylistFromSpotify from "@/api/spotify/playlistApi";
import { useQuery } from "@tanstack/react-query";
import MenuIcon from "../svgComponents/MenuIcon";
import Top50TrackItem from "./Top50TrackItem";

const TOP_50 = import.meta.env.VITE_SPOTIFY_TOP_50_KR;

const Top50TrackList = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["top50-trackList", TOP_50],
		queryFn: () => getPlaylistFromSpotify(TOP_50),
		staleTime: 1000 * 60 * 60 * 24,
	});

	if (isLoading) return null;

	return (
		<div className="relative mt-53 px-20 desktop:px-60">
			<MenuIcon />
			<h1 className="absolute left-70 top-4 text-mainBlack desktop:left-130 desktop:top-5">
				TOP 50
			</h1>

			<Top50TrackItem tracks={data.tracks.items} />
		</div>
	);
};

export default Top50TrackList;

import {
	getArtistAlbums,
	getArtistInfo,
	getArtistTopTracks,
	getRelatedArtists,
} from "@/api/spotify/artistApi";
import { Spinner } from "@/components";
import ArtistAlbumList from "@/components/artist/ArtistAlbumList";
import ArtistImage from "@/components/artist/ArtistImage";
import ArtistTopTrack from "@/components/artist/ArtistTopTrack";
import RelatedArtist from "@/components/artist/RelatedArtist";
import ErrorComponent from "@/components/common/ErrorComponent";
import Header from "@/components/common/Header";
import SPINNER_TEXT from "@/constants/spinnerText";
import usePlayNowStore from "@/zustand/playNowStore";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ArtistInfo = () => {
	const { id: artist_id } = useParams();
	const currentTrack = usePlayNowStore((state) => state.currentTrack);
	const results = useQueries({
		queries: [
			{
				queryKey: ["artist-info", artist_id],
				queryFn: () => getArtistInfo(artist_id),
			},
			{
				queryKey: ["artist-albums", artist_id],
				queryFn: () => getArtistAlbums(artist_id as string),
			},
			{
				queryKey: ["artist-topTracks", artist_id],
				queryFn: () => getArtistTopTracks(artist_id),
			},
			{
				queryKey: ["artist-relatedArtist", artist_id],
				queryFn: () => getRelatedArtists(artist_id as string),
			},
		],
	});

	const isLoading = results.some((result) => result.isLoading);
	const isError = results.some((result) => result.isError);

	const renderComponents = () => {
		if (isLoading) {
			return <Spinner text={SPINNER_TEXT.ARTISTINFO_TEXT} />;
		}

		if (isError) {
			return <ErrorComponent />;
		}

		return (
			<div>
				<Header type="ARTIST" />
				<ArtistImage artist_info={results[0].data} />
				<ArtistAlbumList artist_albums={results[1].data} />
				<ArtistTopTrack artist_topTracks={results[2].data} />
				<RelatedArtist
					artist_relatedArtistracks={results[3].data}
					propsClass={currentTrack ? "mb-160" : "mb-80"}
				/>
			</div>
		);
	};

	return renderComponents();
};

export default ArtistInfo;

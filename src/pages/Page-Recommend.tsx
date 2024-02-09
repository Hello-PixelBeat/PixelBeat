import ErrorComponent from "@/components/common/ErrorComponent";
import ArtistSelector from "@/components/recommend/ArtistSelector";
import GenreSelector from "@/components/recommend/GenreSelector";
import MakingBillAnimateComponent from "@/components/recommend/MakingBillAnimateComponent";
import TrackSelector from "@/components/recommend/TrackSelector";
import { useState } from "react";
import { useParams } from "react-router-dom";

type ValidParams = "genre" | "artist" | "track";

const isValidParamsId = (id: string): boolean =>
	["genre", "artist", "track"].includes(id as ValidParams);

const Recommend = () => {
	const { id: currentPath = "genre" } = useParams<string>();
	const [isMakingBillAnimate, setIsMakingBillAnimate] = useState(false);

	if (!isValidParamsId(currentPath)) {
		return <ErrorComponent />;
	}

	if (isMakingBillAnimate) return <MakingBillAnimateComponent />;

	const renderComponent = (currentPath: string) => {
		return {
			genre: <GenreSelector />,
			artist: <ArtistSelector />,
			track: <TrackSelector setIsMakingBillAnimate={setIsMakingBillAnimate} />,
		}[currentPath];
	};

	return (
		<div className="px-20 desktop:px-60">{renderComponent(currentPath)}</div>
	);
};

export default Recommend;

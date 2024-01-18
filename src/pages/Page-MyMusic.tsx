import ErrorComponent from "@/components/common/ErrorComponent";
import MusicList from "@/components/mymusic/MusicList";
import MusicShelf from "@/components/mymusic/MusicShelf";
import { useParams } from "react-router-dom";

type ValidParams = "playnow" | "shelf";
const isValidParamsId = (id: string): boolean =>
	["playnow", "shelf"].includes(id as ValidParams);

const MyMusic = () => {
	const { id: currentPath = "playnow" } = useParams<string>();

	if (!isValidParamsId(currentPath)) {
		return <ErrorComponent />;
	}
	return (
		<div className="px-20 desktop:px-60">
			{currentPath === "playnow" && <MusicList />}
			{currentPath === "shelf" && <MusicShelf />}
		</div>
	);
};

export default MyMusic;

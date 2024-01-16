import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import MoreIcon from "@/assets/svgs/MoreIcon.svg?react";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";

const PlaylistItem = ({ data, setSelectedPlaylist }: any) => {
	const navigate = useNavigate();
	const { openModal } = useModal();

	const handleClickMoreButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		openModal("PLAYLIST_MORE");
		setSelectedPlaylist(data);
	};

	return (
		<>
			<li
				className="group relative cursor-pointer hover:bg-mainGray300"
				key={data.id}
				onClick={() => navigate(`/spotifybill/${data.id}`)}
			>
				<div className="flex items-center gap-10 border-1 border-b-0 ">
					<img
						className="mr-4 h-51 w-50 
                 desktop:h-66 desktop:w-65"
						src={data.images[0] ? data.images[0].url : defaultAlbumImage}
						alt={`${data.name}.img`}
					/>
					<p className="w-246 truncate group-hover:underline desktop:w-470 desktop:text-20">
						{data.name}
					</p>
					<button
						type="button"
						onClick={handleClickMoreButton}
						className="absolute right-10"
					>
						<MoreIcon className="text-mainWhite" />
					</button>
				</div>
			</li>
		</>
	);
};

export default PlaylistItem;

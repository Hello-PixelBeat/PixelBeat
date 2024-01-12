import { useNavigate } from "react-router-dom";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";

const CommonArtistItem = ({ data, isDrag }: any) => {
	const navigate = useNavigate();

	return (
		<li
			className="datas-center group my-6 mr-8 flex h-176 w-150 cursor-pointer flex-col"
			onClick={() => {
				if (!isDrag) navigate(`/artistinfo/${data.id}`);
			}}
		>
			<div className="h-156 w-150 overflow-y-hidden  border-[1.4px] border-b-0">
				<img
					className="h-156 w-150"
					src={data.images[1] ? data.images[1].url : defaultAlbumImage}
					alt={`${data.name}.img`}
				/>
			</div>
			<div className="w-full truncate whitespace-nowrap bg-mainGray text-center text-mainBlack group-hover:underline">
				{data.name}
			</div>
		</li>
	);
};

export default CommonArtistItem;

import { useNavigate } from "react-router-dom";
import RectangleVertax from "../svgComponents/RectangleVertax";
import defaultAlbumImg from "@/assets/images/defaultAlbumImage.png";

const CommonAlbumItem = ({ data, isDrag }: any) => {
	const navigate = useNavigate();

	return (
		<li
			onClick={() => {
				if (!isDrag) navigate(`/albuminfo/${data.id}`);
			}}
			className="group relative h-176 w-150 flex-shrink-0 cursor-pointer flex-col bg-mainGray"
		>
			<RectangleVertax />
			{data.images && data.images.length > 0 && (
				<img
					className={`h-150 w-150 cursor-pointer`}
					src={data.images[1] ? data.images[1].url : defaultAlbumImg}
					alt={`${data.name}.img`}
				/>
			)}
			<p className="mx-auto h-26 w-140 truncate text-center text-mainBlack group-hover:underline desktop:text-16">
				{data.name}
			</p>
		</li>
	);
};
export default CommonAlbumItem;

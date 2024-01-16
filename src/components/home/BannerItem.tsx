import { useNavigate } from "react-router-dom";
import RectangleVertax from "../svgComponents/RectangleVertax";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import CirclePlay from "@/assets/svgs/CirclePlay.svg?react";

const BannerItem = ({ result }: any) => {
	const navigate = useNavigate();

	const { id, name, images } = result.data || {
		id: "",
		name: "",
		images: [{ url: "" }],
	};

	const handleClickBanner = ({
		e,
		id,
	}: {
		e: React.MouseEvent<HTMLButtonElement>;
		id: string;
	}) => {
		e.stopPropagation();
		navigate(`/spotifybill/${id}`);
	};

	return (
		<div className="group relative h-383 w-full ">
			<div
				className="absolute top-[-1px] h-385 w-full transition-all group-hover:bg-mainBlackOpacity
"
			>
				<RectangleVertax height="385" />
			</div>
			<img
				className={`h-383 w-full object-cover`}
				src={images[0] ? images[0].url : defaultAlbumImage}
				alt={name + "image"}
			/>
			<h2 className="absolute left-40 top-40 w-270 text-36 leading-[1.1] opacity-0 group-hover:opacity-100">
				{name}
			</h2>
			<button
				type="button"
				className="absolute bottom-40 right-40 text-mainGreen opacity-0 transition-all group-hover:opacity-100"
				onClick={(e) => handleClickBanner({ e, id })}
			>
				<CirclePlay />
			</button>
		</div>
	);
};
export default BannerItem;

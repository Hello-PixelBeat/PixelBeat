import { useNavigate } from "react-router-dom";
import defaultAlbumImg from "@/assets/images/defaultAlbumImage.png";
import graphBgImg from "@/assets/images/graphBackground.png";
import BillChart from "../bill/BillChart";
import { StandardVertex } from "..";

const MusicShelfItem = ({ data }: any) => {
	const navigate = useNavigate();
	const { id, name } = data;
	const isSpotify = !data.analysis;
	const total = isSpotify
		? data.tracks.items.filter((item: any) => item.track.preview_url).length
		: data.tracks.filter((item: any) => item.preview_url).length;

	const handleClickPlaylist = () => {
		navigate(`/mymusic/shelf/${id}`);
	};

	return (
		<li
			className="group flex  h-62 w-full cursor-pointer items-center border-b-1 hover:bg-mainGray300"
			onClick={handleClickPlaylist}
		>
			<div className="relative my-8 ml-10 mr-12 w-44 cursor-pointer">
				{isSpotify ? (
					<img
						src={data.images ? data.images[0].url : defaultAlbumImg}
						alt={`${name}.img`}
						className="h-44"
					/>
				) : (
					<div
						className="w-44 bg-mainWhite bg-[length:43px] bg-[43%_-10%] bg-no-repeat"
						style={{ backgroundImage: `url(${graphBgImg})` }}
					>
						<BillChart
							analysisList={data.analysis}
							color={data.color}
							isSmall
						/>
					</div>
				)}
				<StandardVertex className="absolute top-0 h-44 text-mainBlack group-hover:text-mainGray300" />
			</div>
			<p className="w-230 truncate text-14 group-hover:underline mobile:w-270 desktop:w-500 desktop:text-16 ">
				{name} ({total})
			</p>
		</li>
	);
};

export default MusicShelfItem;

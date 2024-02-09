import { useNavigate } from "react-router-dom";
import defaultAlbumImg from "@/assets/images/defaultAlbumImage.png";
import graphBgImg from "@/assets/images/graphBackground.png";
import BillChart from "../bill/BillChart";
import { StandardVertex } from "..";
import MoreIcon from "@/assets/svgs/MoreIcon.svg?react";
import { useModal } from "@/hooks/useModal";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";
import { useCallback } from "react";

const MusicShelfItem = ({ data, onSelect }: any) => {
	const navigate = useNavigate();
	const { id, name } = data;
	const isSpotify = !data.analysis;
	const total = isSpotify
		? data.tracks.items.filter((item: any) => item.track.preview_url).length
		: data.tracks.filter((item: any) => item.preview_url).length;
	const { openModal } = useModal();

	const setMusicDrawerTracks = useMusicDrawerStore(
		(state) => state.setNowPlayList_MusicDrawer,
	);

	const handleClickPlaylist = useCallback(() => {
		navigate(`/mymusic/shelf/${id}`);

		isSpotify
			? setMusicDrawerTracks(
					data.tracks.items
						.map((item: any) => item.track)
						.filter((item: any) => item.preview_url),
				)
			: setMusicDrawerTracks(data.tracks);
	}, [id, navigate, isSpotify, setMusicDrawerTracks, data.tracks]);

	const handleMoreButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>,
		data: any,
	) => {
		event.stopPropagation();
		openModal("MY_MUSIC_SHELF_DELETE");
		onSelect(data);
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
			<button
				type="button"
				onClick={(e) => handleMoreButtonClick(e, data)}
				className="mr-16 h-24 w-24 hover:text-mainGreen"
			>
				<MoreIcon />
			</button>
		</li>
	);
};

export default MusicShelfItem;

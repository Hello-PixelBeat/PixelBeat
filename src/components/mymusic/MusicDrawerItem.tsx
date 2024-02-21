import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { StandardVertex } from "..";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import MoreIcon from "@/assets/svgs/MoreIcon.svg?react";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";
import { useShallow } from "zustand/react/shallow";
import { setCurrentTrackAndPositionTable } from "@/api/supabase/profilesTableAccessApis";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import useUserStore from "@/zustand/userStore";

const initialTrack = {
	name: "",
	album: { images: [{ url: "" }] },
	artists: [],
	duration_ms: 0,
	preview_url: "",
};

const MusicDrawerItem = ({ track, setSelectedTrack, isSelected }: any) => {
	const navigate = useNavigate();
	const { name, artists, album } = track;
	const { openModal } = useModal();
	const userInfo = useUserStore((state) => state.userInfo);

	const [
		setIsPlaying_MusicDrawer,
		setCurrentTrack_MusicDrawer,
		setIsMusicDrawer,
	] = useMusicDrawerStore(
		useShallow((state) => [
			state.setIsPlaying_MusicDrawer,
			state.setCurrentTrack_MusicDrawer,
			state.setIsMusicDrawer,
		]),
	);

	const { mutate: setCurrentTrackAndPositionTableMutation } =
		useUpdateProfileMutation(setCurrentTrackAndPositionTable);

	const handleClickTrack = () => {
		setIsMusicDrawer(true);
		setCurrentTrack_MusicDrawer(track);
		setIsPlaying_MusicDrawer(true);

		setCurrentTrackAndPositionTableMutation({
			prevNowPlayTracklist: userInfo.nowplay_tracklist,
			track: initialTrack,
			playingPosition: 0,
			userId: userInfo.id,
		});
	};

	const handleClickAlbum = (
		e: React.MouseEvent<HTMLDivElement>,
		id: string,
	) => {
		e.stopPropagation();
		navigate(`/albuminfo/${id}`);
	};

	const handleClickMoreButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		openModal("MUSIC_DRAWER_MORE");
		setSelectedTrack(track);
	};

	return (
		<li
			className="group flex h-62 w-full cursor-pointer items-center justify-between border-b-1 hover:bg-mainGray300"
			onClick={handleClickTrack}
		>
			<div className="flex">
				<div
					onClick={(e) => handleClickAlbum(e, album.id)}
					className="relative my-8 ml-10 mr-12 w-44 cursor-pointer"
				>
					<img
						src={album.images[1] ? album.images[1].url : defaultAlbumImage}
						alt={`${name}.img`}
						className="h-44"
					/>
					<StandardVertex className="absolute top-0 h-44 text-mainBlack group-hover:text-mainGray300" />
				</div>
				<div
					className={`mt-18 flex flex-col text-18 leading-15 ${
						isSelected && "text-mainGreen"
					}`}
				>
					<h3 className="w-230 truncate text-14 desktop:text-16 ">{name}</h3>
					<p className="text-start text-14">
						{artists.map((artist: any, idx: any) => (
							<span key={idx}>
								{artist.name}
								{idx < artists.length - 1 && ", "}
							</span>
						))}
					</p>
				</div>
			</div>

			<button
				type="button"
				onClick={handleClickMoreButton}
				className="mr-16 h-24 w-24 hover:text-mainGreen"
			>
				<MoreIcon />
			</button>
		</li>
	);
};
export default MusicDrawerItem;

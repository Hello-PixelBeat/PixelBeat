import { addCurrentTrackTable } from "@/api/supabase/profilesTableAccessApis";
import { useModal } from "@/hooks/useModal";
import { Track } from "@/types/recommendTypes";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useNavigate } from "react-router-dom";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import { CirclePlaySmall } from "..";
import MoreIcon from "@/assets/svgs/MoreIcon.svg?react";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import { useShallow } from "zustand/react/shallow";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";

const CommonTrackItem = ({
	data,
	setSelectedTrack,
}: {
	data: Track;
	setSelectedTrack: (track: Track) => void;
}) => {
	const navigate = useNavigate();

	const { openModal } = useModal();
	const [setCurrentTrack, setIsPlaying, addTrackToNowPlay] = usePlayNowStore(
		useShallow((state) => [
			state.setCurrentTrack,
			state.setIsPlaying,
			state.addTrackToNowPlay,
		]),
	);
	const userInfo = useUserStore((state) => state.userInfo);

	const setResetMusicDrawer = useMusicDrawerStore(
		useShallow((state) => state.resetStore),
	);

	//현재재생목록에 추가 및 지금 재생
	const { mutate: addCurrentTrackTableMutation } =
		useUpdateProfileMutation(addCurrentTrackTable);

	const handleClickAlbum = (id: string) => {
		navigate(`/albuminfo/${id}`);
	};

	const handleClickAritst = (id: string) => {
		navigate(`/artistinfo/${id}`);
	};

	const handleClickPlayButton = (track: Track) => {
		setResetMusicDrawer();

		addTrackToNowPlay(track);
		setCurrentTrack(track);
		setIsPlaying(true);
		//로그인 유저 db update
		if (userInfo.id) {
			addCurrentTrackTableMutation({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				track,
				userId: userInfo.id,
			});
		}
	};

	const handleClickMoreButton = () => {
		openModal("TRACK_MORE");
		setSelectedTrack(data);
	};

	return (
		<li className="datas-center group relative flex gap-10 border-1 border-b-0 hover:bg-mainGray300">
			<img
				onClick={() => handleClickAlbum(data.album.id)}
				className="mr-4 h-51 w-50
                 cursor-pointer desktop:h-66 desktop:w-65"
				src={
					data.album.images[1] ? data.album.images[1].url : defaultAlbumImage
				}
				alt={`${data.name}.img`}
			/>
			<div className="flex w-170 flex-col justify-center overflow-hidden truncate leading-[1.2] mobile:w-214 desktop:w-450 desktop:text-20">
				<p className={data.name.length > 20 ? "text-flow-on-hover" : ""}>
					{data.name}
				</p>
				<p className={data.artists.length > 2 ? "text-flow-on-hover" : ""}>
					{data.artists.map((artist, idx) => (
						<span
							key={idx}
							className="cursor-pointer hover:underline"
							onClick={() => handleClickAritst(artist.id)}
						>
							{artist.name}
							{idx < data.artists.length - 1 && ", "}
						</span>
					))}
				</p>
			</div>

			{data.preview_url && (
				<button
					type="button"
					onClick={() => handleClickPlayButton(data)}
					className="absolute right-42 top-[50%] translate-y-[-50%]"
				>
					<CirclePlaySmall isWhite />
				</button>
			)}
			<button
				type="button"
				onClick={handleClickMoreButton}
				className="absolute right-10 top-[50%] translate-y-[-50%]"
			>
				<MoreIcon className="text-mainWhite" />
			</button>
		</li>
	);
};

export default CommonTrackItem;

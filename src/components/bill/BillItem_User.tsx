import { addCurrentTrackTable } from "@/api/supabase/profilesTableAccessApis";
import { Track } from "@/types/recommendTypes";
import msToMinutesAndSeconds from "@/utils/msToMinutesAndSeconds";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useNavigate } from "react-router-dom";
import { CirclePlaySmall, StandardVertex } from "..";
import defaultAlbumImg from "@/assets/images/defaultAlbumImage.png";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import { useShallow } from "zustand/react/shallow";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";

const BillItem_User = ({
	track,
	trackNumber,
}: {
	track: Track;
	trackNumber: number;
}) => {
	const navigate = useNavigate();
	const { minutes, seconds } = msToMinutesAndSeconds(track.duration_ms);
	const [setCurrentTrack, setIsPlaying, addTrackToNowPlay] = usePlayNowStore(
		useShallow((state) => [
			state.setCurrentTrack,
			state.setIsPlaying,
			state.addTrackToNowPlay,
		]),
	);

	const setResetMusicDrawer = useMusicDrawerStore(
		useShallow((state) => state.resetStore),
	);

	const userInfo = useUserStore((state) => state.userInfo);

	const { mutate: addCurrentTrackTableMutation } =
		useUpdateProfileMutation(addCurrentTrackTable);

	const handleClickPreviewPlayButton = (track: Track) => {
		setResetMusicDrawer();

		setCurrentTrack(track);
		addTrackToNowPlay(track);
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

	const handleClickAritst = (id: string) => {
		navigate(`/artist/${id}`);
	};

	const handleClickAlbum = () => {
		navigate(`/album/${track.album.id}`);
	};

	return (
		<li className="group mx-16 flex h-48 items-center justify-between text-left text-16 hover:bg-bgGray ">
			<div className="flex items-center">
				<span className="mr-10 w-34 text-center">
					{String(trackNumber + 1).padStart(2, "0")}
				</span>
				{/* 앨범이미지 */}
				<div
					onClick={handleClickAlbum}
					className="relative mr-8 w-36 cursor-pointer"
				>
					<img
						src={
							track.album.images[2]
								? track.album.images[2].url
								: defaultAlbumImg
						}
						alt={track.album.name}
						className="h-36"
					/>
					<StandardVertex className="absolute top-0 h-36 text-mainWhite group-hover:text-bgGray" />
				</div>

				<div className="inline-block w-154 overflow-hidden truncate leading-[1.2]">
					<div
						className={`${track.name.length >= 22 ? "text-flow-on-hover" : ""}`}
					>
						<h3>{track.name}</h3>
					</div>
					<p
						className={`${
							track.artists.length >= 2
								? "text-flow-on-hover self-end text-14"
								: "self-end text-14 "
						}`}
					>
						{track.artists.map((artist, idx) => (
							<span
								key={idx}
								className="cursor-pointer hover:underline"
								onClick={() => handleClickAritst(artist.id)}
							>
								{artist.name}
								{idx < track.artists.length - 1 && ", "}
							</span>
						))}
					</p>
				</div>
			</div>

			<div className="flex pr-3">
				{track.preview_url && (
					<button
						className="mr-18 opacity-0 group-hover:opacity-100"
						onClick={() => handleClickPreviewPlayButton(track)}
					>
						<CirclePlaySmall />
					</button>
				)}

				<p className="mt-4">{`${minutes}:${seconds}`}</p>
			</div>
		</li>
	);
};

export default BillItem_User;

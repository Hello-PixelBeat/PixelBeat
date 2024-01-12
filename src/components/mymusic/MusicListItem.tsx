import { setCurrentTrackAndPositionTable } from "@/api/supabase/profilesTableAccessApis";
import { useModal } from "@/hooks/useModal";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { StandardVertex } from "..";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import MoreIcon from "@/assets/svgs/MoreIcon.svg?react";

const MusicListItem = ({ track, setSelectedTrack, isSelected }: any) => {
	const navigate = useNavigate();
	const { name, artists, album } = track;
	const { openModal } = useModal();
	const setCurrentTrack = usePlayNowStore((state) => state.setCurrentTrack);
	const setIsPlaying = usePlayNowStore((state) => state.setIsPlaying);
	const userInfo = useUserStore((state) => state.userInfo);
	const queryClient = useQueryClient();

	//현재 음악 설정 및 재생
	const setCurrentTrackAndPositionTableMutation = useMutation({
		mutationFn: setCurrentTrackAndPositionTable,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userInfo.id],
			});
		},
		onError(error) {
			console.log(error);
		},
	});

	const handleClickTrack = () => {
		setCurrentTrack(track);
		setIsPlaying(true);
		setCurrentTrackAndPositionTableMutation.mutateAsync({
			prevNowPlayTracklist: userInfo.nowplay_tracklist,
			track,
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
		openModal("MY_NOW_PLAY_TRACK_MORE");
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
				className="mr-16 h-24 w-24"
			>
				<MoreIcon />
			</button>
		</li>
	);
};
export default MusicListItem;

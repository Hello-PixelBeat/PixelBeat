import { addCurrentTrackTable } from "@/api/supabase/profilesTableAccessApis";
import { Track } from "@/types/recommendTypes";
import msToMinutesAndSeconds from "@/utils/msToMinutesAndSeconds";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CirclePlaySmall, StandardVertex } from "..";
import defaultAlbumImg from '@/assets/images/defaultAlbumImage.png'

const BillItem_User = ({
	track,
	trackNumber,
}: {
	track: Track;
	trackNumber: number;
}) => {
	const navigate = useNavigate();
	const { minutes, seconds } = msToMinutesAndSeconds(track.duration_ms);

	const setCurrentTrack = usePlayNowStore ((state) => state.setCurrentTrack);
	const setIsPlaying = usePlayNowStore((state) => state.setIsPlaying);
	const addTrackToNowPlay = usePlayNowStore((state) => state.addTrackToNowPlay);
	const setNowPlayStore = usePlayNowStore((state) => state.setNowPlayStore);
	const userInfo = useUserStore((state) => state.userInfo);
	const setUserInfo = useUserStore((state) => state.setUserInfo);
	const queryClient = useQueryClient();

	const addCurrentTrackTableMutation = useMutation({
		mutationFn: addCurrentTrackTable,
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userInfo.id],
			});
			setUserInfo(data);
			setNowPlayStore(data.nowplay_tracklist);
		},
		onError(error) {
			console.log(error);
		},
	});

	const handleClickPreviewPlayButton = (track: Track) => {
		setCurrentTrack(track);
		addTrackToNowPlay(track);
		setIsPlaying(true);
		//로그인 유저 db update
		if (userInfo.id) {
			addCurrentTrackTableMutation.mutateAsync({
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
					<StandardVertex
           className="h-36 absolute top-0 text-mainWhite group-hover:text-bgGray" />
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
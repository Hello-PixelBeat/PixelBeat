import { addCurrentTrackTable } from "@/api/supabase/profilesTableAccessApis";
import { Track } from "@/types/recommendTypes";
import msToMinutesAndSeconds from "@/utils/msToMinutesAndSeconds";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import CirclePlaySmall from "@/assets/svgs/CirclePlaySmall.svg?react";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import { useShallow } from "zustand/react/shallow";

interface BillItemProps {
	trackNumber: number;
	track: Track;
}

const BillItem = ({ trackNumber, track }: BillItemProps) => {
	const { minutes, seconds } = msToMinutesAndSeconds(track.duration_ms);
	const [setCurrentTrack, setIsPlaying, addTrackToNowPlay] = usePlayNowStore(
		useShallow((state) => [
			state.setCurrentTrack,
			state.setIsPlaying,
			state.addTrackToNowPlay,
		]),
	);
	const userInfo = useUserStore((state) => state.userInfo);

	// 현재 재생목록에 추가 및 지금 재생
	const { mutate: addCurrentTrackTableMutation } =
		useUpdateProfileMutation(addCurrentTrackTable);

	const handleClickPreviewPlayButton = (track: Track) => {
		setIsPlaying(true);
		setCurrentTrack(track);
		addTrackToNowPlay(track);

		//로그인 유저 db update
		if (userInfo.id) {
			addCurrentTrackTableMutation({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				track,
				userId: userInfo.id,
			});
		}
	};

	return (
		<li className="group mx-16 flex h-48 items-center justify-between text-left text-16 hover:bg-bgGray ">
			<div className="flex items-center">
				<span className="ml-8 mr-22">
					{String(trackNumber + 1).padStart(2, "0")}
				</span>
				<div className="inline-block w-194 overflow-hidden truncate leading-[1.2]">
					{/* TRACK_NAME */}
					<div
						className={`${track.name.length >= 28 ? "text-flow-on-hover" : ""}`}
					>
						<h3>{track.name}</h3>
					</div>

					{/* ARTIST_NAME */}
					<p
						className={`${
							track.artists.length >= 3
								? "text-flow-on-hover self-end text-14"
								: "self-end text-14"
						}`}
					>
						{track.artists.map((artist, idx) => (
							<span key={idx}>
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
						className="mr-18 hidden group-hover:block"
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

export default BillItem;

import getPlaylistFromSpotify from "@/api/spotify/playlistApi";
import { getBillFromSupabase } from "@/api/supabase/playlistTableAccessApis";
import useUserStore from "@/zustand/userStore";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "@/assets/svgs/ArrowDown.svg?react";
import MusicShelfItem from "./MusicShelfItem";
import Portal from "@/utils/portal";
import { useModal } from "@/hooks/useModal";
import BottomSheet from "../common/BottomSheet";

import {
	deleteTrackToMusicShelf_own,
	deleteTrackToMusicShelf_save,
} from "@/api/supabase/profilesTableAccessApis";
import { Spinner } from "..";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import NOTIFICATION_TEXT from "@/constants/notificationText";
import { deleteTracklistInComparesTracklist } from "@/api/supabase/deletedTracksTableAccessApis";

interface selectedTrackId {
	name: string;
	id: string;
}

const MusicShelf = () => {
	const navigate = useNavigate();
	const userInfo = useUserStore((state) => state.userInfo);
	const own_tracklist = userInfo.own_tracklist;
	const [saved_tracklist, setSavedTracklist] = useState<string[]>([]);
	const [selectedTrackId, setSelectedTrackId] = useState<selectedTrackId>({
		name: "",
		id: "",
	});
	const { modalType } = useModal();
	const [isFinishChecking, setIsFinishChecking] = useState<boolean>(false);

	const { mutate: updateDeletedBillsMutation } = useUpdateProfileMutation(
		deleteTracklistInComparesTracklist,
	);

	useEffect(() => {
		updateDeletedBillsMutation(
			{
				prevTracklist: userInfo.saved_tracklist,
				type: "saved",
				userId: userInfo.id,
			},
			{
				onSuccess: (newUserInfo) => {
					setSavedTracklist(
						newUserInfo
							? newUserInfo.saved_tracklist
							: userInfo.saved_tracklist || [],
					);
					setIsFinishChecking(true);
				},
			},
		);
	}, []);

	const queries = [...saved_tracklist, ...own_tracklist].map((tracklistId) => {
		const queryKey =
			tracklistId.length === 36
				? ["bill from PixelBeat", tracklistId]
				: ["bill from Spotify", tracklistId];

		const queryFn =
			tracklistId.length === 36
				? () => getBillFromSupabase(tracklistId)
				: () => getPlaylistFromSpotify(tracklistId);

		const enable = isFinishChecking;

		return { queryKey, queryFn, enable };
	});

	const results = useQueries({ queries });

	const isLoading =
		results.some((result) => result.isLoading) || !isFinishChecking;

	const { mutate: deleteTrackToMusicShelfMutation_own } =
		useUpdateProfileMutation(deleteTrackToMusicShelf_own);

	const { mutate: deleteTrackToMusicShelfMutation_save } =
		useUpdateProfileMutation(deleteTrackToMusicShelf_save);

	const goToListMain = () => {
		navigate("/mymusic/playnow");
	};

	const handleDeleteBill = () => {
		const mutation = selectedTrackId.name.includes(userInfo.username)
			? deleteTrackToMusicShelfMutation_own
			: deleteTrackToMusicShelfMutation_save;

		mutation({
			prevTracklist: selectedTrackId.name.includes(userInfo.username)
				? own_tracklist
				: saved_tracklist,
			trackId: selectedTrackId.id,
			userId: userInfo.id,
		});
	};

	if (isLoading) return <Spinner />;

	return (
		<div className="flex flex-col">
			<section className="mt-30 flex justify-between text-20">
				<div>
					<button className="musicList w-113" onClick={goToListMain}>
						재생목록
					</button>
					<button className="musicListGreen w-113 text-mainBlack">
						음악서랍
					</button>
				</div>
				<button onClick={() => navigate(-1)} className="h-24 w-24">
					<ArrowDown />
				</button>
			</section>
			<ul className="mx-auto mb-80 min-h-[80svh] w-full border">
				{results.length > 0 ? (
					results.map((traklist) => (
						<MusicShelfItem
							data={traklist.data}
							key={traklist.data.id}
							onSelect={setSelectedTrackId}
						/>
					))
				) : (
					<p className="mt-40 w-full text-center ">
						{NOTIFICATION_TEXT.EMPTY_PLAYLIST}
					</p>
				)}
			</ul>

			<Portal>
				{modalType === "MY_MUSIC_SHELF_DELETE" && (
					<BottomSheet onClick={handleDeleteBill} />
				)}
			</Portal>
		</div>
	);
};
export default MusicShelf;

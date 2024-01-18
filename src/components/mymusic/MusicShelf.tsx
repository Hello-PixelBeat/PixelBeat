import getPlaylistFromSpotify from "@/api/spotify/playlistApi";
import { getBillFromSupabase } from "@/api/supabase/playlistTableAccessApis";
import useUserStore from "@/zustand/userStore";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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

interface selectedTrackId {
	name: string;
	id: string;
}

const MusicShelf = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const userInfo = useUserStore((state) => state.userInfo);
	const saved_tracklist = userInfo.saved_tracklist;
	const own_tracklist = userInfo.own_tracklist;
	const [selectedTrackId, setSelectedTrackId] = useState<selectedTrackId>({
		name: "",
		id: "",
	});
	const { modalType } = useModal();

	const queries = [...saved_tracklist, ...own_tracklist].map((tracklistId) => {
		const queryKey =
			tracklistId.length === 36
				? ["bill from PixelBeat", tracklistId]
				: ["bill from spotify", tracklistId];

		const queryFn =
			tracklistId.length === 36
				? () => getBillFromSupabase(tracklistId)
				: () => getPlaylistFromSpotify(tracklistId);

		return { queryKey, queryFn };
	});

	const results = useQueries({ queries });

	const isLoading = results.some((result) => result.isLoading);

	const deleteTrackToMusicShelfMutation_own = useMutation({
		mutationFn: deleteTrackToMusicShelf_own,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userInfo.id],
			});
		},
		onError(error) {
			console.log(error);
		},
	});

	const deleteTrackToMusicShelfMutation_save = useMutation({
		mutationFn: deleteTrackToMusicShelf_save,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userInfo.id],
			});
		},

		onError(error) {
			console.log(error);
		},
	});

	const goToListMain = () => {
		navigate("/mymusic/playnow");
	};

	const handleDeleteBill = () => {
		const mutation = selectedTrackId.name.includes(userInfo.username)
			? deleteTrackToMusicShelfMutation_own
			: deleteTrackToMusicShelfMutation_save;

		mutation.mutateAsync({
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
			<ul className="mx-auto mb-80 min-h-[80vh] w-full border">
				{results.map((traklist) => (
					<MusicShelfItem
						data={traklist.data}
						key={traklist.data.id}
						onSelect={setSelectedTrackId}
					/>
				))}
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

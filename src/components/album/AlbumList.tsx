import { addNowPlayTracklistTable } from "@/api/supabase/profilesTableAccessApis";
import { useModal } from "@/hooks/useModal";
import { Track } from "@/types/recommendTypes";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CommonTrackItem from "../common/CommonTrackItem";
import Portal from "@/utils/portal";
import BottomSheet from "../common/BottomSheet";

const AlbumList = ({ album_list }: any) => {
	const addTrackToNowPlay = usePlayNowStore((state) => state.addTrackToNowPlay);
	const { modalType, closeModal } = useModal();
	const queryClient = useQueryClient();
	const userInfo = useUserStore((state) => state.userInfo);
	const [selectedTrack, setSelectedTrack] = useState<Track>();

	const addNowPlayTracklistTableMutation = useMutation({
		mutationFn: addNowPlayTracklistTable,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userInfo.id],
			});
		},
		onError(error) {
			console.log(error);
		},
	});

	//재생목록에 추가하기
	const handleClickLModalItem = (track: any) => {
		addTrackToNowPlay(track);

		//로그인 사용자일 경우 db에 useMutation 해야함
		if (userInfo.id) {
			addNowPlayTracklistTableMutation.mutateAsync({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				track,
				userId: userInfo.id,
			});
		}

		closeModal();
	};

	const albumData = {
		id: album_list.id,
		images: album_list.images,
		name: album_list.name,
	};

	return (
		<div className="mx-auto mt-20 ">
			<ul className="relative border-b-1">
				{album_list &&
					album_list.tracks.items.map((item: any) => (
						<CommonTrackItem
							key={item.id}
							data={{ ...item, album: albumData }}
							setSelectedTrack={setSelectedTrack}
						/>
					))}
			</ul>
			<Portal>
				{modalType === "TRACK_MORE" && (
					<BottomSheet onClick={() => handleClickLModalItem(selectedTrack)} />
				)}
			</Portal>
		</div>
	);
};

export default AlbumList;

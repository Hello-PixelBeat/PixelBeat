import { deleteTrackToNowPlayTable } from "@/api/supabase/profilesTableAccessApis";
import { useModal } from "@/hooks/useModal";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from '@/assets/svgs/ArrowDown.svg?react'
import Portal from "@/utils/portal";
import BottomSheet from "../common/BottomSheet";
import MusicListItem from "./MusicListItem";

const MusicList = () => {
	const navigate = useNavigate();
	const userId = useUserStore((state) => state.userInfo.id);
	const nowPlaylist = useUserStore((state) => state.userInfo.nowplay_tracklist);
	const currentTrack = usePlayNowStore((state) => state.currentTrack);
	const setCurrentTrack = usePlayNowStore((state) => state.setCurrentTrack);
	const [selectedTrack, setSelectedTrack] = useState<any>();
	const { modalType, closeModal } = useModal();
	const queryClient = useQueryClient();

	const handelNavigateShelf = () => {
		navigate("/mymusic/shelf");
	};

	const deleteTrackToNowPlayTableMutation = useMutation({
		mutationFn: deleteTrackToNowPlayTable,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userId],
			});
  },
		onError(error) {
			console.log(error);
		},
	});

	const handleClickModelList = (e: React.MouseEvent<HTMLButtonElement>) => {
		switch (e.currentTarget.innerText) {
			case "삭제하기":
				if (currentTrack && currentTrack.id === selectedTrack.id) {
					setCurrentTrack(null);
				}
				deleteTrackToNowPlayTableMutation.mutateAsync({
					prevNowPlayTracklist: nowPlaylist,
					track: selectedTrack,
					userId,
				});
				break;
			case "가수 정보 보기":
				navigate(`/artist/${selectedTrack.artists[0].id}`);
				break;
			case "앨범 정보 보기":
				navigate(`/album/${selectedTrack.album.id}`);
				break;
			default:
				return;
		}
		closeModal();
	};

	return (
		<>
			<div className="flex flex-col">
				<section className="mt-30 flex justify-between text-20">
					<div>
						<button className="musicListGreen w-113 text-mainBlack ">
							재생목록
						</button>
						<button className="musicList w-113 " onClick={handelNavigateShelf}>
							음악서랍
						</button>
					</div>
					<button onClick={() => navigate(-1)} className="h-24 w-24">
						<ArrowDown />
					</button>
				</section>
				<ul className="mx-auto mb-140 min-h-[80vh] w-full border">
					{nowPlaylist.tracks.length ? (
						nowPlaylist.tracks.map((track, idx) => (
							<MusicListItem
								track={track}
								key={track.id + idx}
								setSelectedTrack={setSelectedTrack}
								isSelected={currentTrack?.id == track.id}
							/>
						))
					) : (
						<li className="mt-40 w-full text-center ">
							추가된 재생목록이 없습니다
						</li>
					)}
				</ul>
			</div>
			<Portal>
				{modalType === "MY_NOW_PLAY_TRACK_MORE" && (
					<BottomSheet onClick={handleClickModelList} />
				)}
			</Portal>
		</>
	);
};
export default MusicList;

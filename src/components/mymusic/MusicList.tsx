import {
	deleteTrackToNowPlayTable,
	setCurrentTrackAndPositionTable,
} from "@/api/supabase/profilesTableAccessApis";
import { useModal } from "@/hooks/useModal";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "@/assets/svgs/ArrowDown.svg?react";
import Portal from "@/utils/portal";
import BottomSheet from "../common/BottomSheet";
import MusicListItem from "./MusicListItem";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import { useShallow } from "zustand/react/shallow";
import NOTIFICATION_TEXT from "@/constants/notificationText";

const MusicList = () => {
	const navigate = useNavigate();
	const userInfo = useUserStore((state) => state.userInfo);
	const userId = useUserStore((state) => state.userInfo.id);
	const nowPlaylist = useUserStore((state) => state.userInfo.nowplay_tracklist);
	const [currentTrack, setCurrentTrack, setIsPlaying, setNowPlayStore] =
		usePlayNowStore(
			useShallow((state) => [
				state.currentTrack,
				state.setCurrentTrack,
				state.setIsPlaying,
				state.setNowPlayStore,
			]),
		);
	const { modalType, closeModal } = useModal();

	const dragItem = useRef(null); // 드래그할 아이템
	const dragOverItem = useRef(null); // 드랍할 위치의 아이템
	const [selectedTrack, setSelectedTrack] = useState<any>();
	const handelNavigateShelf = () => {
		navigate("/mymusic/shelf");
	};

	// 재생 목록 및 현재 재생 곡 변경
	const { mutate: setCurrentTrackAndPositionTableMutation } =
		useUpdateProfileMutation(setCurrentTrackAndPositionTable);

	const { mutate: deleteTrackToNowPlayTableMutation } =
		useUpdateProfileMutation(deleteTrackToNowPlayTable);

	const handleClickModelList = (e: React.MouseEvent<HTMLButtonElement>) => {
		switch (e.currentTarget.innerText) {
			case "삭제하기":
				if (currentTrack && currentTrack.id === selectedTrack.id) {
					setCurrentTrack(null);
				}
				deleteTrackToNowPlayTableMutation({
					prevNowPlayTracklist: nowPlaylist,
					track: selectedTrack,
					userId,
				});
				break;
			case "가수 정보 보기":
				navigate(`/artistinfo/${selectedTrack.artists[0].id}`);
				break;
			case "앨범 정보 보기":
				navigate(`/albuminfo/${selectedTrack.album.id}`);
				break;
			default:
				return;
		}
		closeModal();
	};

	const dragStart = (_: any, position: any) => {
		dragItem.current = position;
	};

	const dragEnter = (_: any, position: any) => {
		dragOverItem.current = position;
	};

	const drop = () => {
		const newList = [...nowPlaylist.tracks];
		const dragItemValue = newList[dragItem.current!];

		newList.splice(dragItem.current!, 1);
		newList.splice(dragOverItem.current!, 0, dragItemValue);
		dragItem.current = null;
		dragOverItem.current = null;

		setNowPlayStore({
			...nowPlaylist,
			tracks: newList,
			currentTrack,
		});

		setCurrentTrackAndPositionTableMutation(
			{
				prevNowPlayTracklist: { ...nowPlaylist, tracks: newList },
				track: currentTrack,
				playingPosition: 0,
				userId: userInfo.id,
			},
			{
				onSuccess() {
					setCurrentTrack(currentTrack);
					setIsPlaying(true);
				},
			},
		);
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
					{[...nowPlaylist.tracks].length > 0 ? (
						[...nowPlaylist.tracks].map((track, idx) => (
							<MusicListItem
								track={track}
								key={track.id + idx}
								idx={idx}
								setSelectedTrack={setSelectedTrack}
								isSelected={currentTrack?.id == track.id}
								dragItem={dragItem}
								dragOverItem={dragOverItem}
								dragStart={dragStart}
								dragEnter={dragEnter}
								drop={drop}
							/>
						))
					) : (
						<li className="mt-40 w-full text-center ">
							{NOTIFICATION_TEXT.EMPTY_PLAYLIST}
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

import { addNowPlayTracklistTable } from "@/api/supabase/profilesTableAccessApis";
import { useModal } from "@/hooks/useModal";
import { Track } from "@/types/recommendTypes";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useState } from "react";
import MenuIcon from "../svgComponents/MenuIcon";
import CommonTrackItem from "../common/CommonTrackItem";
import Portal from "@/utils/portal";
import BottomSheet from "../common/BottomSheet";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";

const SearchResultTrack = ({ tracks }: { tracks?: any }) => {
	const [visibleTracks, setVisibleTracks] = useState(3);
	const addTrackToNowPlay = usePlayNowStore((state) => state.addTrackToNowPlay);
	const { modalType, closeModal } = useModal();
	const userInfo = useUserStore((state) => state.userInfo);
	const [selectedTrack, setSelectedTrack] = useState<Track>();

	const { mutate: addNowPlayTracklistTableMutation } = useUpdateProfileMutation(
		addNowPlayTracklistTable,
	);

	//재생목록에 추가하기
	const handleClickLModalItem = (track: any) => {
		addTrackToNowPlay(track);

		//로그인 사용자일 경우 db에 useMutation 해야함
		if (userInfo.id) {
			addNowPlayTracklistTableMutation({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				track,
				userId: userInfo.id,
			});
		}

		closeModal();
	};

	const loadMore = () => {
		setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 3);
	};

	if (!tracks || tracks.items.length === 0) {
		return (
			<div className="relative mt-22 desktop:mt-50">
				<MenuIcon />
				<h2 className="absolute left-50 top-3 text-mainBlack desktop:left-100 desktop:top-15">
					음악
				</h2>
				<p>No Item</p>
			</div>
		);
	}

	return (
		<>
			<MenuIcon />
			<h2
				className="absolute left-40 top-4 
                    text-mainBlack 
                    desktop:left-80 desktop:top-5"
			>
				음악
			</h2>
			<div className="relative mt-4 px-1 desktop:px-3">
				<ul className="border-b-1">
					{tracks &&
						tracks.items
							.slice(0, visibleTracks)
							.map((item: any) => (
								<CommonTrackItem
									key={item.id}
									data={item}
									setSelectedTrack={setSelectedTrack}
								/>
							))}
					{visibleTracks < tracks.items.length && (
						<button
							className="w-full border-1 border-b-0 hover:underline"
							onClick={loadMore}
						>
							더보기
						</button>
					)}
				</ul>
			</div>
			<Portal>
				{modalType === "TRACK_MORE" && (
					<BottomSheet onClick={() => handleClickLModalItem(selectedTrack)} />
				)}
			</Portal>
		</>
	);
};

export default SearchResultTrack;

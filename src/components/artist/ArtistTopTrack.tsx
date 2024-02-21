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

export const ArtistTopTrack = ({ artist_topTracks }: any) => {
	const [visibleTracks, setVisibleTracks] = useState(5);
	const addTrackToNowPlay = usePlayNowStore((state) => state.addTrackToNowPlay);
	const userInfo = useUserStore((state) => state.userInfo);
	const [selectedTrack, setSelectedTrack] = useState<Track>();
	const { isShow, closeModal } = useModal();

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
		setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 5);
	};

	return (
		<div className="relative mt-27 px-20 desktop:px-60">
			<MenuIcon />
			<h1 className="absolute left-60 top-4 text-mainBlack desktop:left-130 desktop:top-5">
				인기 트랙
			</h1>
			<div className="relative mt-6 px-1 desktop:pl-3">
				<ul className="border-b-1">
					{artist_topTracks &&
						artist_topTracks
							.slice(0, visibleTracks)
							.map((item: any) => (
								<CommonTrackItem
									data={item}
									key={item.id}
									setSelectedTrack={setSelectedTrack}
								/>
							))}
				</ul>
				{visibleTracks < artist_topTracks.length && (
					<button
						className="w-full border-1 border-t-0 hover:underline"
						onClick={loadMore}
					>
						더보기
					</button>
				)}
			</div>
			<Portal>
				{isShow && (
					<BottomSheet onClick={() => handleClickLModalItem(selectedTrack)} />
				)}
			</Portal>
		</div>
	);
};

export default ArtistTopTrack;

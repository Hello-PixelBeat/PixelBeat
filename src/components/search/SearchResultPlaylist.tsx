import { addSavedTracklist } from "@/api/supabase/profilesTableAccessApis";
import useConfirm from "@/hooks/useConfirm";
import { useModal } from "@/hooks/useModal";
import useUserStore from "@/zustand/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../svgComponents/MenuIcon";
import PlaylistItem from "../common/PlaylistItem";
import Portal from "@/utils/portal";
import BottomSheet from "../common/BottomSheet";
import ConfirmModal from "../common/ConfirmModal";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";

const SearchResultPlaylist = ({ playlists }: any) => {
	const navigate = useNavigate();
	const [visibleTracks, setVisibleTracks] = useState(3);
	const userInfo = useUserStore((state) => state.userInfo);
	const { modalType, closeModal } = useModal();
	const { openConfirm, closeConfirm, isShow, confirmType } = useConfirm();
	const [selectedPlaylist, setSelectedPlaylist] = useState<any>();

	//음악 서랍 저장
	const { mutate: saveBillMutation } =
		useUpdateProfileMutation(addSavedTracklist);

	const handleClickLModalItem = (e: any) => {
		closeModal();
		//비로그인유저면 로그인시키기
		if (!userInfo.id) {
			openConfirm("LOGIN_GUIDE");
			return;
		}

		//로그인 사용자일 경우 db 업데이트
		if (e.target.innerText === "음악서랍에 저장하기") {
			openConfirm("ADD_OWN_PLAYLIST");
		}
	};

	const handleConfirmClick = () => {
		closeConfirm();
		if (confirmType === "LOGIN_GUIDE") {
			navigate("/entry");
		} else {
			if (userInfo.saved_tracklist.includes(selectedPlaylist.id)) {
				saveBillMutation({
					prevSavedTracklist: userInfo.saved_tracklist,
					billId: selectedPlaylist.id,
					userId: userInfo.id,
				});
				closeConfirm();
			} else {
				openConfirm("ALREADY_OWN_PLAYLIST");
			}
		}
	};

	const loadMore = () => {
		setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 3);
	};

	if (!playlists || playlists.items.length === 0) {
		return (
			<div className="relative mt-22">
				<MenuIcon />
				<h2 className="absolute left-50 top-3 text-mainBlack desktop:left-100 desktop:top-15">
					음악영수증
				</h2>
				<p>No Item</p>
			</div>
		);
	}

	return (
		<>
			<MenuIcon />
			<h2 className="absolute left-40 top-4 text-mainBlack desktop:left-80 desktop:top-5">
				음악영수증
			</h2>
			<div className="mt-4 px-1 desktop:px-3">
				<ul className="border-b-1">
					{playlists &&
						playlists.items
							.slice(0, visibleTracks)
							.map((item: any) => (
								<PlaylistItem
									data={item}
									key={item.id}
									setSelectedPlaylist={setSelectedPlaylist}
								/>
							))}
					{visibleTracks < playlists.items.length && (
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
				{modalType === "PLAYLIST_MORE" && (
					<BottomSheet onClick={handleClickLModalItem} />
				)}
				{isShow && <ConfirmModal onConfirmClick={handleConfirmClick} />}
			</Portal>
		</>
	);
};

export default SearchResultPlaylist;

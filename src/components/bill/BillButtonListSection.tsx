import { addNowPlayTracklistAndPlaySongTable } from "@/api/supabase/profilesTableAccessApis";
import BILL_TEXT from "@/constants/billText";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useLocation, useNavigate } from "react-router-dom";
import { StandardButton } from "..";
import BUTTON_TEXT from "@/constants/buttonText";
import { Track, TrackList } from "@/types/recommendTypes";
import shareData from "@/utils/shareData";
import useConfirm from "@/hooks/useConfirm";
import Portal from "@/utils/portal";
import ConfirmModal from "../common/ConfirmModal";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import { useShallow } from "zustand/react/shallow";

const PIXELBEAT_URL = import.meta.env.VITE_BASE_URL;

interface BillButtonsSectionProps {
	data?: TrackList | any;
	className: string;
	isFromSpotify?: boolean;
}

const BillButtonListSection = ({
	data,
	className,
	isFromSpotify,
}: BillButtonsSectionProps) => {
	const navigate = useNavigate();
	const [setCurrentTrack, setNowPlayList, nowPlayTracks, setIsPlaying] =
		usePlayNowStore(
			useShallow((state) => [
				state.setCurrentTrack,
				state.setNowPlayList,
				state.tracks,
				state.setIsPlaying,
			]),
		);
	const userInfo = useUserStore((state) => state.userInfo);
	const { pathname } = useLocation();
	const { openConfirm, isShow } = useConfirm();
	const { mutate: addNowPlayTracklistAndPlaySongTableMutation } =
		useUpdateProfileMutation(addNowPlayTracklistAndPlaySongTable);

	const handleClickPlayAllTrackButton = () => {
		const billTracks = isFromSpotify
			? data.tracks.items
					.map((item: any) => item.track)
					.filter((track: Track) => track.preview_url)
			: data.tracks.filter((track: Track) => track.preview_url);
		setIsPlaying(true);

		const newNowPlayTracklist = [
			...billTracks,
			...nowPlayTracks.filter(
				(item: Track) =>
					billTracks.findIndex((t: Track) => t.id === item.id) !== -1,
			),
		];
		setNowPlayList(newNowPlayTracklist);
		setCurrentTrack(billTracks[0]);

		//로그인 유저면 db 업데이트
		if (userInfo.id) {
			addNowPlayTracklistAndPlaySongTableMutation({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				tracks: billTracks,
				userId: userInfo.id,
			});
		}
	};

	const handleClickShareButton = () => {
		const shareLink = `${PIXELBEAT_URL}${pathname}`;
		const text = BILL_TEXT.SHARE_TEXT;
		const title = BILL_TEXT.SHARE_TITLE;
		shareData({ url: shareLink, text, title }, openConfirm);
	};

	const handleMoveToEntry = () => {
		navigate("/entry");
	};

	const handleMoveToRecommendEntry = () => {
		navigate("/");
	};

	return (
		<>
			<section className={`button-section mx-auto w-356 text-20 ${className}`}>
				<StandardButton
					text={data ? BUTTON_TEXT.PLAY_ALL : BUTTON_TEXT.ANOTHER_BILL}
					onClick={data ? handleClickPlayAllTrackButton : handleMoveToEntry}
					className="w-full"
				/>
				<StandardButton
					text={BUTTON_TEXT.SHARE}
					onClick={handleClickShareButton}
					fillColor="#FFFF57"
					className="mt-12 w-full"
				/>
				<StandardButton
					text={BUTTON_TEXT.RETRY}
					onClick={handleMoveToRecommendEntry}
					fillColor="#FFF"
					className="mb-42 mt-12 w-full"
				/>
			</section>
			{isShow && (
				<Portal>
					<ConfirmModal />
				</Portal>
			)}
		</>
	);
};

export default BillButtonListSection;

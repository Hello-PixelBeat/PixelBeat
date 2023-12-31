import { addNowPlayTracklistAndPlaySongTable } from "@/api/supabase/profilesTableAccessApis";
import BILL_TEXT from "@/constants/billText";
import { usePlayNowStore } from "@/zustand/playNowStore";
import { useUserStore } from "@/zustand/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { StandardButton } from "..";
import BUTTON_TEXT from "@/constants/buttonText";
import { Track, TrackList } from "@/types/recommendTypes";
import shareData from "@/utils/shareData";
import useConfirm from "@/hooks/useConfirm";
import Portal from "@/utils/portal";
import ConfirmModal from "../common/ConfirmModal";

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
	const setCurrentTrack = usePlayNowStore((state) => state.setCurrentTrack);
	const setNowPlayList = usePlayNowStore((state) => state.setNowPlayList);
	const setNowPlayStore = usePlayNowStore((state) => state.setNowPlayStore);
	const nowPlayTracks = usePlayNowStore((state) => state.tracks);
	const setIsPlaying = usePlayNowStore((state) => state.setIsPlaying);
	const userInfo = useUserStore((state) => state.userInfo);
	const setUserInfo = useUserStore((state) => state.setUserInfo);
	const queryClient = useQueryClient();
	const { pathname } = useLocation();
	const { openConfirm, isShow } = useConfirm();

	//전체 재생
	const addNowPlayTracklistAndPlaySongTableMutation = useMutation({
		mutationFn: addNowPlayTracklistAndPlaySongTable,
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userInfo.id],
			});
			setUserInfo(data);
			setNowPlayStore(data.nowplay_tracklist);
		},
		onError(error) {
			console.log(error);
		},
	});

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
			addNowPlayTracklistAndPlaySongTableMutation.mutateAsync({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				tracks: billTracks,
				userId: userInfo.id,
			});
		}
	};

	const handleClickShareButton = () => {
		const shareLink = `http://localhost:5173${pathname}`;
		const text = BILL_TEXT.BUTTON_TEXT;
		const title = BILL_TEXT.BUTOTN_TITLE;
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

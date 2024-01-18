import {
	deleteBill,
	getBillFromSupabase,
} from "@/api/supabase/playlistTableAccessApis";
import { updateOwnTracklist } from "@/api/supabase/profilesTableAccessApis";
import { Spinner } from "@/components";
import BillBox_User from "@/components/bill/BillBox_User";
import BillButtonListSection from "@/components/bill/BillButtonListSection";
import BottomSheet from "@/components/common/BottomSheet";
import ConfirmModal from "@/components/common/ConfirmModal";
import Header from "@/components/common/Header";
import SPINNER_TEXT from "@/constants/spinnerText";
import useConfirm from "@/hooks/useConfirm";
import { useModal } from "@/hooks/useModal";
import { TrackList } from "@/types/recommendTypes";
import Portal from "@/utils/portal";
import usePlayNowStore from "@/zustand/playNowStore";
import useRecommendStore from "@/zustand/recommendStore";
import useUserStore from "@/zustand/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserBill = () => {
	const userInfo = useUserStore((state) => state.userInfo);
	const { id: playlistId, userid: userId } = useParams<string>();
	const { openModal, modalType, closeModal } = useModal();
	const { openConfirm, isShow } = useConfirm();
	const currentTrack = usePlayNowStore((state) => state.currentTrack);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const resetRecommendStore = useRecommendStore(
		(state) => state.resetRecommendStore,
	);

	useEffect(() => {
		resetRecommendStore();
	}, []);

	const { data, isLoading } = useQuery<TrackList>({
		queryKey: ["bill", playlistId, userId],
		queryFn: () => getBillFromSupabase(playlistId!),
		enabled: !!playlistId,
	});

	//프로필에서 빌지삭제
	const updateOwnTracklistMutation = useMutation({
		mutationFn: updateOwnTracklist,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["profiles from supabase", userId],
			});
			navigate("/home");
			closeModal();
		},
		onError(error) {
			console.log(error);
		},
	});

	// 빌지테이블에서 빌지삭제
	const deleteBillMutation = useMutation({
		mutationFn: deleteBill,
		onSuccess() {
			updateOwnTracklistMutation.mutateAsync({
				prevOwnTracklist: userInfo.own_tracklist,
				billId: playlistId!,
				userId: userId!,
			});
		},
		onError(error) {
			console.log(error);
		},
	});

	const handleClickMoreButton = () => {
		openModal("MYBILL_MORE");
	};
	const handleDeleteBill = () => {
		deleteBillMutation.mutateAsync(playlistId as string);
	};

	// 수정하기 기능 추가 예정
	const handleClickModalButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		switch (e.currentTarget.innerText) {
			case "삭제하기":
				openConfirm("delete");
				break;
			default:
				return;
		}
	};

	if (isLoading) return <Spinner text={SPINNER_TEXT.BILL_TEXT} />;

	return (
		<>
			<Header
				type="BILL"
				onClickRightButton={handleClickMoreButton}
				isNoneMore={!userInfo.id || userInfo.id !== userId}
			/>
			<div className="h-52 w-full bg-mainGreen pt-6">
				<div className="mx-auto h-20 w-376 rounded-[10px] bg-[#282828]"></div>
			</div>
			<BillBox_User data={data} />
			<BillButtonListSection
				data={data}
				className={currentTrack ? "mb-180" : "mb-90"}
			/>
			<Portal>
				{modalType === "MYBILL_MORE" && (
					<BottomSheet onClick={handleClickModalButton} />
				)}
				{isShow && <ConfirmModal onConfirmClick={handleDeleteBill} />}
			</Portal>
		</>
	);
};

export default UserBill;

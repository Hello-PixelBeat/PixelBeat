import { getBillFromSupabase } from "@/api/supabase/playlistTableAccessApis";
import { Spinner } from "@/components";
import BillBox_User from "@/components/bill/BillBox_User";
import BillButtonListSection from "@/components/bill/BillButtonListSection";
import Header from "@/components/common/Header";
import SPINNER_TEXT from "@/constants/spinnerText";
import { TrackList } from "@/types/recommendTypes";
import usePlayNowStore from "@/zustand/playNowStore";
import useRecommendStore from "@/zustand/recommendStore";
import useUserStore from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserBill = () => {
	const userInfo = useUserStore((state) => state.userInfo);
	const { id: playlistId, userid: userId } = useParams<string>();
	const currentTrack = usePlayNowStore((state) => state.currentTrack);
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

	if (isLoading) return <Spinner text={SPINNER_TEXT.BILL_TEXT} />;

	return (
		<>
			<Header type="BILL" isNoneMore={!userInfo.id || userInfo.id !== userId} />
			<div className="h-52 w-full bg-mainGreen pt-6">
				<div className="mx-auto h-20 w-376 rounded-[10px] bg-[#282828]"></div>
			</div>
			<BillBox_User data={data} />
			<BillButtonListSection
				data={data}
				className={currentTrack ? "mb-180" : "mb-90"}
			/>
		</>
	);
};

export default UserBill;
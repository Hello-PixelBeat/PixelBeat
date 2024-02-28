import { getBillFromSupabase } from "@/api/supabase/playlistTableAccessApis";
import SPINNER_TEXT from "@/constants/spinnerText";
import { TrackList } from "@/types/recommendTypes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LogoBlack from "@/assets/images/LogoBlack.png";
import BILL_TEXT from "@/constants/billText";
import graphBgImg from "@/assets/images/graphBackground.png";
import BillChart from "@/components/bill/BillChart";
import Clock from "@/assets/svgs/Clock.svg?react";
import BillItem from "@/components/bill/BillItem";
import formatDate from "@/utils/formatDate";
import barcodeImg from "@/assets/images/barcode.png";
import BillButtonListSection from "@/components/bill/BillButtonListSection";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import useRecommendStore from "@/zustand/recommendStore";
import { useEffect } from "react";
import { Spinner } from "@/components";
import MetaTag from "@/components/common/MetaTag";
import { useShallow } from "zustand/react/shallow";

const GuestBill = () => {
	const { id: billId } = useParams();
	const [setNowPlayList, currentTrack] = usePlayNowStore(
		useShallow((state) => [state.setNowPlayList, state.currentTrack]),
	);
	const userInfo = useUserStore((state) => state.userInfo);
	const resetRecommendStore = useRecommendStore(
		(state) => state.resetRecommendStore,
	);

	const { data: guestBillData, isLoading } = useQuery<TrackList | undefined>({
		queryKey: ["guestBill"],
		queryFn: () => getBillFromSupabase(billId),
		enabled: !!billId,
	});

	useEffect(() => {
		resetRecommendStore();
		if (guestBillData && !userInfo.id) {
			setNowPlayList(guestBillData.tracks.filter((track) => track.preview_url));
		}
	}, [guestBillData]);

	if (isLoading) return <Spinner text={SPINNER_TEXT.BILL_TEXT} />;

	return (
		<>
			<MetaTag title="음악영수증" description={BILL_TEXT.SHARE_TEXT} />
			<div className="bill-background-side mx-auto mb-50 mt-42 w-354 bg-white text-center text-mainBlack ">
				<h1 className="mx-auto my-20 w-200">
					<img src={LogoBlack} alt="logo image" />
				</h1>
				<div className="mx-16 flex h-48 flex-col justify-center border-y-2 border-dashed border-mainBlack pl-14  text-left text-14 leading-[1.2]">
					<p className="w-200 truncate ">
						{guestBillData && (
							<>
								{guestBillData.tracks
									.slice(0, 2)
									.map(
										(item, idx) => `${item.artists[0].name}${idx <= 1 && ", "}`,
									)}
								{BILL_TEXT.ETC}
							</>
						)}
					</p>
					<p>{BILL_TEXT.PRODUCER}</p>
				</div>

				{guestBillData && (
					<div
						className="mx-auto my-0 mb-[-18px] mt-[-20px] w-270 bg-[length:136px] bg-[55.6%_54%] bg-no-repeat"
						style={{ backgroundImage: `url(${graphBgImg})` }}
					>
						<BillChart
							analysisList={guestBillData.analysis!}
							color={guestBillData.color}
						/>
					</div>
				)}

				<div className="mx-16 flex h-34 items-center justify-between border-y-2 border-dashed border-mainBlack text-16 ">
					<span>
						<span className="ml-12 mr-26">#</span>
						{BILL_TEXT.SONG}
					</span>

					<i className="mr-12">
						<Clock />
					</i>
				</div>

				{guestBillData && (
					<section className="data-section my-6">
						<ul>
							{guestBillData.tracks.map((track, index) => (
								<BillItem key={track.id} trackNumber={index} track={track} />
							))}
						</ul>
					</section>
				)}

				{guestBillData && (
					<section className="bill-bottom-section ">
						<div className=" mx-16 border-y-2 border-dashed border-mainBlack py-8 text-14">
							<time className="block w-full text-left">
								{formatDate(guestBillData.created_at)}
							</time>
							<div className="flex w-full justify-between">
								<p>{BILL_TEXT.PIXELBEATE_DOMAIN}</p>
								<p>{BILL_TEXT.PROVIDER}</p>
							</div>
						</div>
					</section>
				)}

				<img
					src={barcodeImg}
					alt={BILL_TEXT.BARCODE_IMG_ALT}
					className="mx-auto mb-5 mt-24"
				/>
			</div>
			<BillButtonListSection className={currentTrack ? "mb-100" : ""} />
		</>
	);
};

export default GuestBill;

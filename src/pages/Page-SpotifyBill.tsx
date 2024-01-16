import getPlaylistFromSpotify from "@/api/spotify/playlistApi";
import { Spinner } from "@/components";
import BillBox from "@/components/bill/BillBox";
import BillButtonListSection from "@/components/bill/BillButtonListSection";
import Header from "@/components/common/Header";
import SPINNER_TEXT from "@/constants/spinnerText";
import usePlayNowStore from "@/zustand/playNowStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const SpotifyBill = () => {
	const { trackid } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ["playlistFromSpotify", trackid],
		queryFn: () => getPlaylistFromSpotify(trackid as string),
	});

	const currentTrack = usePlayNowStore((state) => state.currentTrack);

	if (isLoading) return <Spinner text={SPINNER_TEXT.SPOTIFYBILL_TEXT} />;

	return (
		<>
			<Header type="BILL" isNoneMore />
			<div className="h-52 w-390 bg-mainGreen pt-6 desktop:w-[720px]">
				<div className="mx-auto h-20 w-376 rounded-[10px] bg-[#282828]"></div>
			</div>
			<BillBox data={data} />
			<BillButtonListSection
				data={data}
				className={currentTrack ? "mb-180" : "mb-90"}
				isFromSpotify
			/>
		</>
	);
};

export default SpotifyBill;

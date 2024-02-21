import { addSavedTracklist } from "@/api/supabase/profilesTableAccessApis";
import useConfirm from "@/hooks/useConfirm";
import getAllTracksDuration from "@/utils/getAllTracksDuration";
import msToMinutesAndSeconds from "@/utils/msToMinutesAndSeconds";
import useUserStore from "@/zustand/userStore";
import CircleAdd from "@/assets/svgs/CircleAdd.svg?react";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import barcodeImg from "@/assets/images/barcode.png";
import { StandardVertex } from "..";
import BillItem_User from "./BillItem_User";
import formatDate from "@/utils/formatDate";
import Portal from "@/utils/portal";
import ConfirmModal from "../common/ConfirmModal";
import BILL_TEXT from "@/constants/billText";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";

const BillBox = ({ data }: any) => {
	const { name, owner, images, tracks, id: billId } = data;
	const userInfo = useUserStore((state) => state.userInfo);
	const { openConfirm, isShow, confirmType } = useConfirm();
	const { mutate: addSavedTracklistMutate } =
		useUpdateProfileMutation(addSavedTracklist);

	const handleSaveBill = () => {
		if (!userInfo.id) {
			openConfirm("LOGIN_GUIDE");
			return;
		}

		if (!userInfo.saved_tracklist) {
			userInfo.saved_tracklist = [];
		}

		if (userInfo.saved_tracklist.includes(billId)) {
			openConfirm("ALREADY_OWN_PLAYLIST");
			return;
		}

		if (userInfo.id) {
			addSavedTracklistMutate(
				{
					prevSavedTracklist: userInfo.saved_tracklist,
					billId,
					userId: userInfo.id,
				},
				{
					onSuccess() {
						openConfirm("MUSIC_SHELF_SAVE");
					},
				},
			);
		}
	};

	const allTrackDuration = getAllTracksDuration({
		tracks: tracks.items,
		isPlaylist: true,
	});

	const { minutes, seconds } = msToMinutesAndSeconds(allTrackDuration);

	return (
		<div className="bill-background-side mx-auto mb-50 mt-[-24px] w-354 bg-white text-center text-mainBlack">
			<h1 className="mb-16 px-30 text-28 leading-[1.2]">{name}</h1>

			<div className="mx-16 flex h-48 items-center justify-between border-y-2 border-dashed border-mainBlack text-16 ">
				<div className="ml-12 text-left text-14 leading-none">
					<p>
						{tracks.items
							.slice(0, 2)
							.map(
								(item: any, idx: any) =>
									`${item.track.artists[0].name}${idx < 1 && ", "}`,
							)}
						{BILL_TEXT.ETC}
					</p>
					<p>
						{BILL_TEXT.MADE_BY}
						{owner.display_name.length >= 14
							? owner.display_name.slice(0, 14) + "..."
							: owner.display_name}
					</p>
				</div>
				<CircleAdd
					type="button"
					onClick={handleSaveBill}
					className="mr-12 cursor-pointer"
				/>
			</div>

			{/* 플리 이미지  */}
			<div className="relative mx-auto my-20 w-180">
				<img
					src={images[0] ? images[0].url : defaultAlbumImage}
					alt={`${name}.img`}
				/>
				<StandardVertex fillColor="white" className="absolute top-0" />
			</div>

			<div className="mx-16 flex h-34 items-center justify-between border-y-2 border-dashed border-mainBlack text-16 ">
				<span>
					<span className="ml-12 mr-26">#</span>
					{BILL_TEXT.SONG}
				</span>
				<span className="mr-12">
					{tracks.total}곡 •{` ${minutes}분 ${seconds}초`}
				</span>
			</div>

			<section className="data-section my-6">
				<ul>
					{tracks.items.map((item: any, idx: any) => (
						<BillItem_User
							key={item.track.id}
							trackNumber={idx}
							track={item.track}
						/>
					))}
				</ul>
			</section>

			<section className="bill-bottom-section">
				<div className=" mx-16 border-y-2 border-dashed border-mainBlack py-8 text-14">
					<time className="block w-full text-left">
						{formatDate(tracks.items[0].added_at)}
					</time>
					<div className="flex w-full justify-between">
						<p>{BILL_TEXT.PIXELBEATE_DOMAIN}</p>
						<p>{BILL_TEXT.PROVIDER}</p>
					</div>
				</div>
			</section>
			<img
				loading="lazy"
				src={barcodeImg}
				alt={BILL_TEXT.BARCODE_IMG_ALT}
				className="mx-auto mb-5 mt-24"
			/>
			<Portal>
				{isShow && confirmType === "LOGIN_GUIDE" && <ConfirmModal />}
			</Portal>
		</div>
	);
};
export default BillBox;

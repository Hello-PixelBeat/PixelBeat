import { updateBillLikes } from "@/api/supabase/playlistTableAccessApis";
import {
	addSavedTracklist,
	updateLikedTracklist,
} from "@/api/supabase/profilesTableAccessApis";
import useConfirm from "@/hooks/useConfirm";
import getAllTracksDuration from "@/utils/getAllTracksDuration";
import msToMinutesAndSeconds from "@/utils/msToMinutesAndSeconds";
import useUserStore from "@/zustand/userStore";
import { useState } from "react";
import HeartButton from "../svgComponents/HeartButton";
import graphBgImg from "@/assets/images/graphBackground.png";
import BillItem_User from "./BillItem_User";
import formatDate from "@/utils/formatDate";
import barcodeImg from "@/assets/images/barcode.png";
import Portal from "@/utils/portal";
import ConfirmModal from "../common/ConfirmModal";
import BillChart from "./BillChart";
import CircleAdd from "@/assets/svgs/CircleAdd.svg?react";
import BILL_TEXT from "@/constants/billText";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";

const BillBox_User = ({ data }: any) => {
	const { name, owner, created_at, tracks, analysis, color, id, likes } = data;
	const userInfo = useUserStore((state) => state.userInfo);
  
	const [isHearted, setIsHearted] = useState(
		userInfo.liked_tracklist?.includes(id!) ?? false,
	);
	const { openConfirm, isShow, confirmType } = useConfirm();
	//좋아요
	const { mutate: likeBillMutation } =
		useUpdateProfileMutation(updateLikedTracklist);
	//좋아요 수 제어
	const { mutate: likeCountBillMutation } =
		useUpdateProfileMutation(updateBillLikes);
	//음악 서랍 저장
	const { mutate: saveBillMutation } =
		useUpdateProfileMutation(addSavedTracklist);

	//프로필안에 컴포넌트 확인 -> 로그인 유도 컴포넌트
	//좋아요 버튼 누르기
	const handleClickHeartButton = () => {
		if (!userInfo.id) {
			openConfirm("LOGIN_GUIDE");
			return;
		}

		setIsHearted((prevIsHearted) => !prevIsHearted);

		likeCountBillMutation({
			prevLikes: likes,
			billId: id,
			isAdd: !isHearted,
		});
		likeBillMutation({
			prevLikedTracklist: userInfo.liked_tracklist,
			billId: id,
			userId: userInfo.id,
		});
	};

	//음악서랍에 저장 버튼 누르기
	const handleClickAddtoMusicShelfButton = () => {
		if (!userInfo.id) {
			openConfirm("LOGIN_GUIDE");
			return;
		}

		if (userInfo.saved_tracklist && userInfo.saved_tracklist.includes(id)) {
			openConfirm("ALREADY_OWN_PLAYLIST");
		}

		saveBillMutation(
			{
				prevSavedTracklist: userInfo.saved_tracklist,
				billId: id,
				userId: userInfo.id,
			},
			{
				onSuccess() {
					openConfirm("MUSIC_SHELF_SAVE");
				},
			},
		);
	};

	const allTrackDuration = getAllTracksDuration({ tracks });
	const { minutes, seconds } = msToMinutesAndSeconds(allTrackDuration);

	return (
		<>
			<div className="bill-background-side mx-auto mb-50 mt-[-24px] w-354 bg-white text-center text-mainBlack">
				<h1 className="mb-16 px-30 text-28 leading-[1.2]">{name}</h1>

				<div className="mx-16 flex h-48 items-center justify-between border-y-2 border-dashed border-mainBlack text-16 ">
					<div className="ml-12 text-left text-14 leading-[1.2]">
						<p className="w-200 truncate ">
							{tracks
								.slice(0, 2)
								.map(
									(item: any, idx: any) =>
										`${item.artists[0].name}${idx < 1 && ", "}`,
								)}
							{BILL_TEXT.ETC}
						</p>
						<p>
							{BILL_TEXT.MADE_BY} <span>{owner.username}</span>
						</p>
					</div>
					<div className="flex items-center">
						<HeartButton
							onClick={handleClickHeartButton}
							isHearted={isHearted}
							propsClass="mr-12"
						/>
						{!userInfo.own_tracklist?.includes(id) && (
							<button
								type="button"
								className="mr-12"
								onClick={handleClickAddtoMusicShelfButton}
							>
								<CircleAdd />
							</button>
						)}
					</div>
				</div>

				{/*그래프  */}
				<div
					className="mx-auto my-0 mb-[-10px] mt-[-10px] w-270 bg-[length:136px] bg-[55.6%_54%] bg-no-repeat"
					style={{ backgroundImage: `url(${graphBgImg})` }}
				>
					<BillChart analysisList={analysis} color={color} />
				</div>

				<div className="mx-16 flex h-34 items-center justify-between border-y-2 border-dashed border-mainBlack text-16 ">
					<span>
						<span className="ml-12 mr-26">#</span>
						{BILL_TEXT.SONG}
					</span>
					<span className="mr-12">
						{tracks.length}곡 •{` ${minutes}분 ${seconds}초`}
					</span>
				</div>

				<section className="data-section my-6">
					<ul>
						{tracks.map((track: any, idx: any) => (
							<BillItem_User key={track.id} trackNumber={idx} track={track} />
						))}
					</ul>
				</section>

				<section className="bill-bottom-section">
					<div className=" mx-16 border-y-2 border-dashed border-mainBlack py-8 text-14">
						<time className="block w-full text-left">
							{formatDate(created_at)}
						</time>
						<div className="flex w-full justify-between">
							<p>{BILL_TEXT.PIXELBEATE_DOMAIN}</p>
							<p>{BILL_TEXT.PROVIDER}</p>
						</div>
					</div>
				</section>
				<img
					src={barcodeImg}
					alt={BILL_TEXT.BARCODE_IMG_ALT}
					className="mx-auto mb-5 mt-24"
				/>
			</div>
			<Portal>
				{isShow && confirmType === "LOGIN_GUIDE" && <ConfirmModal />}
			</Portal>
		</>
	);
};
export default BillBox_User;

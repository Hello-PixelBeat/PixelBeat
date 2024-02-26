import { updateBillLikes } from "@/api/supabase/playlistTableAccessApis";
import { updateLikedTracklist } from "@/api/supabase/profilesTableAccessApis";
import msToMinutesAndSeconds from "@/utils/msToMinutesAndSeconds";
import useUserStore from "@/zustand/userStore";
import { useState } from "react";
import SmallBillSide from "../svgComponents/SmallBillSide";
import BillChart from "../bill/BillChart";
import { StandardVertex } from "..";
import graphBackground from "@/assets/images/graphBackground.png";
import HeartButton from "../svgComponents/HeartButton";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";

const ProfileSmallBill = ({
	id,
	onClick,
	data,
}: {
	id?: string;
	onClick?: any;
	data: any;
}) => {
	const userProfile = useUserStore((state) => state.userInfo);
	const [isHearted, setIsHearted] = useState(
		userProfile?.liked_tracklist?.includes(id!) || false,
	);
	// 좋아요
	const { mutate: likeBillMutation } =
		useUpdateProfileMutation(updateLikedTracklist);
	// 좋아요 수 제어
	const { mutate: likeCountBillMutation } =
		useUpdateProfileMutation(updateBillLikes);

	// 좋아요 버튼 누르기
	const handleClickHeartButton = () => {
		setIsHearted((prevIsHearted) => !prevIsHearted);

		likeCountBillMutation({
			prevLikes: data.likes,
			billId: id!,
			isAdd: !isHearted,
		});

		likeBillMutation({
			prevLikedTracklist: userProfile.liked_tracklist,
			billId: id!,
			userId: userProfile.id,
		});
	};

	const totalDuration = data?.tracks.reduce(
		(sum: number, item: any) => sum + item.duration_ms,
		0,
	);

	const { minutes, seconds } = msToMinutesAndSeconds(Number(totalDuration));

	return (
		<div
			className="relative mt-30 h-200 w-150 bg-mainWhite text-center text-mainBlack 
                desktop:h-[300px] desktop:w-[250px]"
		>
			<SmallBillSide className="absolute top-[-15px]" />
			{!data && <>삭제된 영수증 입니다.</>}
			{data && (
				<>
					<p
						onClick={() => onClick(id)}
						className=" mx-auto flex h-38 w-140 cursor-pointer
                        flex-col overflow-hidden
                        text-center text-14 hover:underline desktop:mt-15                        
                        desktop:h-60 desktop:w-180 desktop:text-20
                        "
					>
						{data.name || `${data?.owner?.username}의 영수증`}
					</p>

					<div
						className="relative mx-auto mt-10 h-100
                      w-100 flex-col desktop:mt-0
                      desktop:h-160 desktop:w-160"
					>
						<StandardVertex className={`absolute text-mainWhite`} />

						<div
							className="mx-auto my-0 mt-0 w-100 
              bg-[length:98px] bg-[43%_-10%] bg-no-repeat
              desktop:mt-14 desktop:w-132 desktop:bg-[length:129px]"
							style={{ backgroundImage: `url(${graphBackground})` }}
						>
							<BillChart
								analysisList={data?.analysis}
								color={data?.color}
								isSmall={true}
							/>
						</div>
					</div>

					<div
						className="mx-11 mt-10 flex items-center justify-between
                  border-y border-dashed border-mainBlack py-2
                  desktop:mx-25 desktop:mt-0 desktop:h-20
                 desktop:py-20 "
					>
						<p
							className="flex items-center text-14
            desktop:ml-10 desktop:text-20"
						>
							{`${data?.tracks.length}곡 • ${minutes}분 ${seconds}초`}
						</p>
						<HeartButton
							isHearted={isHearted}
							onClick={handleClickHeartButton}
						/>
					</div>
					<SmallBillSide className="absolute bottom-[-15px] rotate-180" />
				</>
			)}
		</div>
	);
};
export default ProfileSmallBill;

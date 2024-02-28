import { getBillFromSupabase } from "@/api/supabase/playlistTableAccessApis";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import MyPageBillButton from "../svgComponents/MyPageBillButton";
import MiniBill from "../svgComponents/MiniBill";
import Heart from "../svgComponents/Heart";
import { User } from "@/types/user";
import BUTTON_TEXT from "@/constants/buttonText";
import useUserStore from "@/zustand/userStore";
import ProfileSmallBill from "./ProfileSmallBill";
import { useEffect, useState } from "react";
import { deleteTracklistInComparesTracklist } from "@/api/supabase/deletedTracksTableAccessApis";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";

const ProfileLikeBillList = ({ userInfo }: { userInfo: User }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const currentPath = pathname.split("/")[1];
	const loggedInUser = useUserStore((state) => state.userInfo);
	const [isFinishChecking, setIsFinishChecking] = useState<boolean>(false);

	const toggleRoutes = () => {
		if (currentPath === "mypage") {
			navigate("/mypage/bills");
		}

		if (currentPath === "user") {
			navigate(`/user/${userInfo?.id}/bills`);
		}
	};

	const moveToBill = (id: string, userId: string) => {
		navigate(`/userbill/${id}/${userId}`);
	};

	const { mutate: updateDeletedBillsMutation } = useUpdateProfileMutation(
		deleteTracklistInComparesTracklist,
	);

	useEffect(() => {
		updateDeletedBillsMutation(
			{
				prevTracklist: loggedInUser.liked_tracklist,
				type: "liked",
				userId: loggedInUser.id,
			},
			{
				onSuccess: () => setIsFinishChecking(true),
			},
		);
	}, []);

	const QueryBillItem = ({ id }: { id: string }) => {
		const { data, isLoading }: any = useQuery({
			queryKey: ["my-like-bill", id],
			queryFn: () => getBillFromSupabase(id as string),
			enabled: isFinishChecking,
		});
		0;

		if (isLoading || !isFinishChecking) return null;

		return (
			<ProfileSmallBill
				key={id}
				id={id}
				onClick={() => moveToBill(id, data?.owner?.userId)}
				data={data}
			/>
		);
	};

	return (
		<div className="mb-[200px] min-h-[80svh] px-20 pt-24 desktop:px-60">
			<div className="flex flex-row">
				<div onClick={toggleRoutes} className="relative flex cursor-pointer">
					<MyPageBillButton
						type="submit"
						propsClass="flex flex-row"
						width={140}
						textColor="white"
						height={35}
						text={
							loggedInUser.id === userInfo?.id
								? BUTTON_TEXT.PROFILE_BILL_MINE
								: BUTTON_TEXT.PROFILE_BILL_USER
						}
						fillColor1={"black"}
						fillColor2={"white"}
					/>
					<div className="absolute left-12 top-10">
						<MiniBill fillColor="white" />
					</div>
				</div>

				<div className="relative flex cursor-pointer">
					<MyPageBillButton
						type="submit"
						height={35}
						textColor="black"
						text={BUTTON_TEXT.PROFILE_BILL_LIKE}
						fillColor1={"white"}
						fillColor2={"white"}
					/>
					<div className=" absolute left-14 top-11">
						<Heart fillColor="black" />
					</div>
				</div>
			</div>

			<div
				className="grid-auto-rows-auto grid h-auto min-h-[500px] grid-cols-2 
             items-start justify-center justify-items-center 
             gap-x-6 gap-y-12 border-1 px-10
             pb-40 desktop:gap-20
             desktop:px-30"
			>
				{userInfo?.liked_tracklist &&
					userInfo?.liked_tracklist?.map((item) => (
						<QueryBillItem key={item} id={item} />
					))}
			</div>
		</div>
	);
};

export default ProfileLikeBillList;

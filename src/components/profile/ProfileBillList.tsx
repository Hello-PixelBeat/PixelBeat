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

const ProfileBillList = ({ userInfo }: { userInfo?: User }) => {
	const loggedInUser = useUserStore((state) => state.userInfo);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const currentPath = pathname.split("/")[1];

	const moveToLike = () => {
		if (currentPath === "mypage") {
			navigate("/mypage/likebills");
		}

		if (currentPath === "user") {
			navigate(`/user/${userInfo?.id}/likebills`);
		}
	};

	const moveToBill = (id: string) => {
		navigate(`/userbill/${id}/${userInfo?.id}`);
	};

	const QueryBillItem = ({ id, moveToBill }: any) => {
		const { data, isLoading }: any = useQuery({
			queryKey: ["my-bill", id],
			queryFn: () => getBillFromSupabase(id as string),
		});

		if (isLoading) return null;

		return (
			<ProfileSmallBill onClick={() => moveToBill(id)} id={id} data={data} />
		);
	};

	return (
		<div className="mb-[200px] min-h-[80svh] px-20 pt-24 desktop:px-60">
			<div className="flex flex-row ">
				<div className="relative flex cursor-pointer">
					<MyPageBillButton
						type="submit"
						width={140}
						height={35}
						textColor="black"
						text={
							loggedInUser.id === userInfo?.id
								? BUTTON_TEXT.PROFILE_BILL_MINE
								: BUTTON_TEXT.PROFILE_BILL_USER
						}
						fillColor1={"white"}
					/>
					<div className="absolute left-12 top-10">
						<MiniBill fillColor="black" />
					</div>
				</div>

				<div onClick={moveToLike} className="relative flex cursor-pointer">
					<MyPageBillButton
						type="submit"
						height={35}
						textColor="mainWhite"
						text={BUTTON_TEXT.PROFILE_BILL_LIKE}
						fillColor1={"black"}
					/>
					<div className="absolute left-12 top-11">
						<Heart fillColor="white" />
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
				{userInfo?.own_tracklist &&
					userInfo?.own_tracklist.map((item) => (
						<QueryBillItem key={item} id={item} moveToBill={moveToBill} />
					))}
			</div>
		</div>
	);
};
export default ProfileBillList;

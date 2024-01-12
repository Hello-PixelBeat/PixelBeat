import { getBillFromSupabase } from "@/api/supabase/playlistTableAccessApis";
import useUserStore from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SmallBill } from "./SmallBill";
import MyPageBillButton from "../svgComponents/MyPageBillButton";
import MiniBill from "../svgComponents/MiniBill";
import Heart from "../svgComponents/Heart";

export const MyLikeBillList = () => {
	const navigate = useNavigate();
	const userInfo = useUserStore((state) => state.userInfo);
	const moteToMe = () => {
		navigate("/mypage/mine");
	};
	const moveToBill = (id: string, userId: string) => {
		navigate(`/bill/${id}/${userId}`);
	};

	const QueryBillItem = ({ id }: { id: string }) => {
		const { data, isLoading }: any = useQuery({
			queryKey: ["my-like-bill", id],
			queryFn: () => getBillFromSupabase(id as string),
		});

		if (isLoading) return null;
		return (
			<SmallBill
				key={id}
				id={id}
				onClick={() => moveToBill(id, data.owner.userId)}
				data={data}
			/>
		);
	};

	return (
		<div className="mb-[200px] min-h-[80vh] px-20 pt-24 desktop:px-60">
			<div className="flex flex-row">
				<div onClick={moteToMe} className="relative flex cursor-pointer">
					<MyPageBillButton
						type="submit"
						propsClass="flex flex-row"
						width={140}
						textColor="white"
						height={35}
						text={"내 영수증"}
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
						text={"좋아요 영수증"}
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
				{userInfo &&
					userInfo?.liked_tracklist.map((item) => (
						<QueryBillItem key={item} id={item} />
					))}
			</div>
		</div>
	);
};

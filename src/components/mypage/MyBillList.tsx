import { getBillFromSupabase } from "@/api/supabase/playlistTableAccessApis";
import useUserStore from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SmallBill } from "./SmallBill";
import MyPageBillButton from "../svgComponents/MyPageBillButton";
import MiniBill from "../svgComponents/MiniBill";
import Heart from "../svgComponents/Heart";

const MyBillList = () => {
	const navigate = useNavigate();
	const userInfo = useUserStore((state) => state.userInfo);

	// getBill
	const moveToLike = () => {
		navigate("/mypage/like");
	};

	const moveToBill = (id: string) => {
		navigate(`/userbill/${id}/${userInfo.id}`);
	};

	const QueryBillItem = ({ id, moveToBill }: any) => {
		const { data, isLoading }: any = useQuery({
			queryKey: ["my-bill", id],
			queryFn: () => getBillFromSupabase(id as string),
		});

		if (isLoading) return null;

		return <SmallBill onClick={() => moveToBill(id)} id={id} data={data} />;
	};

	return (
		<div className="mb-[200px] min-h-[80vh] px-20 pt-24 desktop:px-60">
			<div className="flex flex-row ">
				<div className="relative flex cursor-pointer">
					<MyPageBillButton
						type="submit"
						width={140}
						height={35}
						textColor="black"
						text={"내 영수증"}
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
						text={"좋아요 영수증"}
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
				{userInfo &&
					userInfo?.own_tracklist.map((item) => (
						<QueryBillItem key={item} id={item} moveToBill={moveToBill} />
					))}
			</div>
		</div>
	);
};
export default MyBillList;

import { useNavigate } from "react-router-dom";
import graphBgImg from "@/assets/images/graphBackground.png";
import BillChart from "../bill/BillChart";
import { TrackList } from "@/types/recommendTypes";

interface PopularUserBillProps {
	data: TrackList;
	isDrag: any;
}

export const PopularUserBill = ({ data, isDrag }: PopularUserBillProps) => {
	const navigate = useNavigate();
	const { owner, analysis, color, id } = data;

	const handleClickGraph = () => {
		if (!isDrag) {
			navigate(`/userbill/${id}/${owner?.userId}`);
		}
	};

	const handleClickUser = (event: React.MouseEvent<HTMLHeadingElement>) => {
		if (!isDrag) {
			event.stopPropagation();
			navigate(`/user/${owner?.userId}/bills`);
		}
	};

	return (
		<li className="flex cursor-pointer" onClick={handleClickGraph}>
			<div className="h-186 w-160 bg-white">
				<h3
					onClick={handleClickUser}
					className="h-26 bg-mainGray text-center leading-28 text-black hover:underline desktop:text-18"
				>
					{owner?.username}
				</h3>
				<div
					className="mx-auto my-0 mt-14 w-132 bg-mainWhite bg-[length:129px] bg-[43%_-10%] bg-no-repeat"
					style={{ backgroundImage: `url(${graphBgImg})` }}
				>
					{analysis ? (
						<BillChart analysisList={analysis} color={color} isSmall />
					) : (
						<p>No Data</p>
					)}
				</div>
			</div>
		</li>
	);
};

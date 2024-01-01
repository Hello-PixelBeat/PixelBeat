import { RECOMMEND_HEADER_TEXT } from "@/constants/recommend";

const RecommendHeader = ({ headerText }: { headerText: string[] }) => {
	return (
		<div>
			<h1 className="mt-42 grid place-items-center text-22 desktop:text-40">
				{headerText}
			</h1>
			<h2 className="mb-20 grid place-items-center text-14 desktop:text-20">
				{RECOMMEND_HEADER_TEXT.COUNT}
			</h2>
		</div>
	);
};

export default RecommendHeader;

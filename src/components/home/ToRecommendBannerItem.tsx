import { useNavigate } from "react-router-dom";
import RectangleVertax from "../svgComponents/RectangleVertax";
import bannerDesktopImage from "@/assets/images/bannerBg_desktop.png";
import bannerMobileImage from "@/assets/images/bannerBg_mobile.png";
import CirclePlay from "@/assets/svgs/CirclePlay.svg?react";

const ToRecommendBannerItem = () => {
	const navigate = useNavigate();

	const handleClickBanner = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		navigate(`/recommend/genre`);
	};

	return (
		<div className="relative h-383 w-full bg-mainGreen ">
			<div
				className="w-inherit absolute top-[-1px] h-385 
"
			/>
			<RectangleVertax height="385" />
			<picture
				className={`object-fit absolute block w-full desktop:right-30 desktop:top-40 desktop:w-[382.5px]`}
			>
				<source srcSet={bannerDesktopImage} media="(min-width:720px)" />
				<img src={bannerMobileImage} alt="추천 유도 배너 이미지" />
			</picture>
			<h2 className="absolute bottom-32 left-40 w-270 text-26 leading-[1.2] text-black">
				취향에 딱 맞는 <br />
				음악 영수증
			</h2>
			<button
				type="button"
				className="absolute bottom-35 right-40 transition-all desktop:right-50"
				onClick={(e) => handleClickBanner(e)}
			>
				<CirclePlay />
			</button>
		</div>
	);
};
export default ToRecommendBannerItem;

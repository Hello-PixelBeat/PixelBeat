import logo from "@/assets/images/logo.png";
import { StandardButton } from "@/components";
import { BUTTON_TEXT } from "@/constants/buttonText";
import { useNavigate } from "react-router-dom";

const BUTTON_STYLE = "h-56 w-356 desktop:h-60 desktop:w-[500px]";

const RecommendEntry = () => {
	const navigate = useNavigate();

	const moveToRecomend = () => {
		navigate("/recommend/genre");
	};
	const moveToEntry = () => {
		navigate("/entry");
	};

	return (
		<div className="flex flex-col items-center">
			<img
				className="mx-auto 
        mt-[20vh] w-300 
        desktop:mt-[12vh] desktop:w-500"
				src={logo}
				alt="logo image"
			/>
			<div
				className="fixed top-[60vh] mx-auto flex 
                  flex-col gap-7"
			>
				<StandardButton
					className={BUTTON_STYLE}
					text={BUTTON_TEXT.ENTRY}
					onClick={moveToRecomend}
				/>
				<StandardButton
					className={BUTTON_STYLE}
					fillColor="#FFFF57"
					text={BUTTON_TEXT.LOGIN}
					onClick={moveToEntry}
				/>
			</div>
		</div>
	);
};

export default RecommendEntry;

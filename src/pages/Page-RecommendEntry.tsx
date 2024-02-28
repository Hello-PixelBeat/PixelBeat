import Logo from "@/assets/images/Logo.png";
import { StandardButton } from "@/components";
import BUTTON_TEXT from "@/constants/buttonText";
import useUserStore from "@/zustand/userStore";
import { useNavigate } from "react-router-dom";

const BUTTON_STYLE = "h-56 w-356 desktop:h-60 desktop:w-[500px]";

const RecommendEntry = () => {
	const navigate = useNavigate();
	const userInfo = useUserStore((state) => state.userInfo);

	const moveToRecomend = () => {
		navigate("/recommend/genre");
	};
	const moveToEntry = () => {
		navigate("/entry");
	};
	const moveToHome = () => {
		navigate("/home");
	};

	return (
		<div className="flex flex-col items-center">
			<img
				className="mx-auto 
        mt-[20svh] w-300 
        desktop:mt-[12svh] desktop:w-500"
				src={Logo}
				alt="logo image"
			/>
			<div
				className="fixed top-[60svh] mx-auto flex 
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
					text={userInfo.id ? BUTTON_TEXT.HOME : BUTTON_TEXT.LOGIN}
					onClick={userInfo.id ? moveToHome : moveToEntry}
				/>
			</div>
		</div>
	);
};

export default RecommendEntry;

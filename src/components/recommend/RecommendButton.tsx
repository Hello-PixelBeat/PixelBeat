import { BUTTON_TEXT } from "@/constants/buttonText";
import { StandardButton } from "@/components/svgComponents";
import { useLocation } from "react-router-dom";

const RecommendButton = ({
	isButtonDisabled,
	onClick,
}: {
	isButtonDisabled?: boolean;
	onClick?: () => void;
}) => {
	const { pathname } = useLocation();

	return (
		<div
			className={`sticky bottom-0 mx-auto my-0 bg-black px-10 py-10 text-22`}
		>
			<StandardButton
				height={70}
				text={
					pathname === "/recommend/track"
						? BUTTON_TEXT.COMPLETE
						: BUTTON_TEXT.NEXT
				}
				onClick={onClick}
				className="w-full"
				disabled={isButtonDisabled}
			/>
		</div>
	);
};

export default RecommendButton;
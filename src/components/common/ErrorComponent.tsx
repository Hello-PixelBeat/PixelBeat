import { ERROR_TEXTS } from "@/constants/errorText";
import { useNavigate } from "react-router-dom";
import { SmallButton } from "..";

const ErrorComponent = () => {
	const navigate = useNavigate();
	return (
		<div className="layout-screen-width pt-60 text-center text-16 leading-[1.5] outline">
			<header>{ERROR_TEXTS.headerText}</header>
			<div>{ERROR_TEXTS.apologyText}</div>
			<div>{ERROR_TEXTS.errorText}</div>
			<SmallButton
				onClick={() => navigate("/home")}
				text={ERROR_TEXTS.returnText}
				propsClass="w-150 mt-20 relative"
			/>
		</div>
	);
};

export default ErrorComponent;

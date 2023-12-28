import { ERROR_TEXTS } from "@/constants/errorText";

const ErrorComponent = () => {
	return (
		<div className="layout-screen-width border-1">
			<header>{ERROR_TEXTS.headerText}</header>
			<div>{ERROR_TEXTS.apologyText}</div>
			<div>{ERROR_TEXTS.errorText}</div>
		</div>
	);
};

export default ErrorComponent;

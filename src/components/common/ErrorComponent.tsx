import { ERROR_TEXTS } from "@/constants/errorText";

const ErrorComponent = () => {
	return (
		<div>
			<header>{ERROR_TEXTS.headerText}</header>
			<div>{ERROR_TEXTS.apologyText}</div>
			<div>{ERROR_TEXTS.errorText}</div>
		</div>
	);
};

export default ErrorComponent;

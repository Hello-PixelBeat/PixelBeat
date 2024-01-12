interface ValidationErrorMessageProps {
	text: string;
	isValid: boolean;
}
const ValidationErrorMessage = ({
	text,
	isValid,
}: ValidationErrorMessageProps) => {
	if (!text || text === "") {
		return null;
	}

	const messageText = (
		<span className={`${isValid ? "text-mainGreen" : "text-mainRed"} text-xs`}>
			{text}
		</span>
	);

	return messageText;
};

export default ValidationErrorMessage;

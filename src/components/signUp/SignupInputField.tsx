import Eye from "@/assets/svgs/Eye.svg?react";
import ClosedEye from "@/assets/svgs/ClosedEye.svg?react";
import { useRef, useState } from "react";
import ValidationErrorMessage from "./ValidationErrorMessage";

interface SignupInputFieldProps {
	name?: string;
	label: string;
	value: string;
	placeholder: string;
	type: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isValid: boolean;
	passMessage?: string;
	failMessage?: string;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const SignupInputField: React.FC<SignupInputFieldProps> = ({
	name,
	label,
	value,
	placeholder,
	type,
	onChange,
	isValid,
	passMessage,
	failMessage,
	onBlur,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isIconHidden, setIsIconHidden] = useState(true);
	const [isBlurred, setIsBlurred] = useState(false);

	const toggleIconHidden = () => {
		setIsIconHidden(!isIconHidden);
	};

	const handleBlur = (event: any) => {
		setIsBlurred(true);
		onBlur && onBlur(event);
	};

	const borderColorClass = isBlurred
		? isValid
			? "border-mainGreen"
			: "border-mainRed"
		: "";

	return (
		<div className={`relative flex w-full flex-col gap-4 pt-32`}>
			<label htmlFor={name} className="w-full text-16 text-mainWhite">
				{label}
			</label>
			<input
				ref={inputRef}
				onBlur={handleBlur}
				autoComplete="off"
				type={type}
				name={name || type}
				id={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`w-full border-b-2 bg-mainBlack p-4 outline-none desktop:p-6
        ${isValid ? "focus:border-mainGreen" : "focus:border-mainRed"}
        ${borderColorClass}
      `}
			/>
			{type === "password" && (
				<div
					onClick={() => {
						toggleIconHidden();
						if (inputRef.current) {
							inputRef.current.type = isIconHidden ? "text" : "password";
						}
					}}
					className="absolute right-10  top-55
          text-gray-500
          desktop:top-63
          "
				>
					{isIconHidden ? <ClosedEye /> : <Eye />}
				</div>
			)}
			{isBlurred && (
				<ValidationErrorMessage
					text={isValid ? passMessage! : failMessage!}
					isValid={isValid!}
				/>
			)}
		</div>
	);
};

export default SignupInputField;

import Eye from "@/assets/svgs/Eye.svg?react";
import ClosedEye from "@/assets/svgs/ClosedEye.svg?react";
import { useState } from "react";

interface SigninInputFieldProps {
	value: string;
	placeholder: string;
	type: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SigninInputField = ({
	type,
	placeholder,
	value,
	onChange,
}: SigninInputFieldProps) => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);

	const togglePasswordHidden = () => {
		setIsPasswordHidden(!isPasswordHidden);
	};

	return (
		<div className="relative flex flex-col gap-4 pt-32">
			<label className="text-16 text-mainWhite">
				{type === "email" ? "이메일" : "비밀번호"}
			</label>

			<input
				autoComplete="off"
				type={type === "password" && isPasswordHidden ? "password" : "text"}
				id={type}
				name={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className=" w-[320px] border-b-2 bg-mainBlack
                    p-4 outline-none
                    focus:border-mainGreen desktop:w-[600px]
                  desktop:p-6"
			/>
			{type === "password" && (
				<button
					type="button"
					className=" absolute right-10 
                      top-55  
                      desktop:top-75"
					onClick={togglePasswordHidden}
				>
					{isPasswordHidden ? <ClosedEye /> : <Eye />}
				</button>
			)}
		</div>
	);
};
export default SigninInputField;

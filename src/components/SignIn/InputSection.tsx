import  SigninInputField  from "./SigninInputField";

interface InputSectionProops {
	formState: { email: string; password: string };
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSection = ({ formState, handleInput }: InputSectionProops) => {
	return (
		<div className="flex flex-col items-center justify-center gap-8 py-6 ">
			<SigninInputField
				type="email"
				placeholder="이메일을 입력해 주세요"
				value={formState.email}
				onChange={handleInput}
			/>
			<SigninInputField
				type="password"
				placeholder="비밀번호를 입력해 주세요"
				value={formState.password}
				onChange={handleInput}
			/>
		</div>
	);
};
export default InputSection;

import { useState } from "react";
import { Spinner, StandardButton } from "@/components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUpWithEmail } from "@/api/supabase/authApis";
import SignupInputField from "./SignupInputField";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~@$!%*?&])[A-Za-z\d~@$!%*?&]{6,16}$/;

const SignUpForm = () => {
	const navigate = useNavigate();
	const [formState, setFormState] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const { email, password } = formState;

	const [validationErrors, setValidationErrors] = useState({
		email: false,
		password: false,
		passwordConfirm: false,
	});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleValidation = (e: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		let isValid: boolean;

		switch (name) {
			case "email":
				isValid = emailRegex.test(value);
				break;
			case "password":
				isValid = passwordRegex.test(value);
				break;
			case "passwordConfirm":
				isValid = formState.password === value;
				break;
			default:
				return;
		}

		setValidationErrors((prev) => ({
			...prev,
			[name]: !isValid,
		}));
	};

	const isSubmitDisabled = () => {
		const isEmpty = Object.values(formState).some((value) => value === "");
		const hasErrors = Object.values(validationErrors).some((error) => error);

		return isEmpty || hasErrors;
	};

	const { mutate: signupMutation, isPending } = useMutation({
		mutationFn: signUpWithEmail,
		mutationKey: ["signup", email, password],
		onSuccess: (data: any) => {
			if (data?.user) {
				navigate("/signupgreeting");
			}
		},
		onError: (error) => {
			console.error("회원가입 API 호출 중 에러:", error);
		},
	});

	const MakeProFile = async () => {
		signupMutation({ email, password });
	};

	if (isPending) {
		return <Spinner text={"회원가입 중"} />;
	}

	const failMessageEmail = () => {
		return formState.email === ""
			? "이메일은 필수 정보입니다."
			: "올바른 이메일 형식이 아닙니다.";
	};

	const failMessagePassword = () => {
		return formState.password === ""
			? "비밀번호는 필수 정보입니다."
			: "영문, 숫자, 특수기호를 포함하여 6자~16자로 입력해주세요.";
	};

	return (
		<form
			className="mt-8 flex flex-col items-center justify-center gap-16 truncate py-6"
			onSubmit={(e) => e.preventDefault()}
		>
			<SignupInputField
				label="이메일"
				value={formState.email}
				placeholder="PixelBeat@gmail.com"
				type="email"
				onBlur={handleValidation}
				onChange={handleInput}
				isValid={!validationErrors.email}
				passMessage="사용가능한 이메일입니다."
				failMessage={failMessageEmail()}
			/>
			<SignupInputField
				onBlur={handleValidation}
				label="비밀번호"
				value={formState.password}
				placeholder="비밀번호를 입력해 주세요"
				type={"password"}
				onChange={handleInput}
				isValid={!validationErrors.password}
				passMessage="사용가능한 계정 비밀번호입니다."
				failMessage={failMessagePassword()}
			/>
			<SignupInputField
				onBlur={handleValidation}
				name="passwordConfirm"
				label="비밀번호 확인"
				value={formState.passwordConfirm}
				placeholder="비밀번호를 한번 더 입력해 주세요"
				type={"password"}
				onChange={handleInput}
				isValid={
					!validationErrors.passwordConfirm && formState.passwordConfirm !== ""
				}
				passMessage="비밀번호와 일치합니다."
				failMessage={"비밀번호와 일치하지 않습니다."}
			/>
			<StandardButton
				className="mx-auto mt-22 h-56
          w-full 
          desktop:h-60 "
				text={"다 음"}
				onClick={MakeProFile}
				disabled={isSubmitDisabled()}
				fillColor={isSubmitDisabled() ? undefined : "#57FF57"}
			/>
		</form>
	);
};
export default SignUpForm;

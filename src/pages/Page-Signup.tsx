import SignUpForm from "@/components/signUp/SignUpForm";
import getUserIdFromLocalStorage from "@/utils/getUserIdFromLocalStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const isLoggedInUser = getUserIdFromLocalStorage();

	const moveToLogin = () => {
		navigate("/login");
	};
	const moveToBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (isLoggedInUser) {
			navigate("/entry");
		}
	}, [isLoggedInUser]);

	return (
		<div className="px-20 desktop:px-60">
			<h1 className="my-56 text-center text-24">이메일로 회원가입</h1>
			<SignUpForm />
			<div
				className="flex justify-center
                          py-10
                          text-14
                          desktop:text-18 "
			>
				<button onClick={moveToLogin} className="pr-12">
					이메일로 로그인
				</button>
				|
				<button onClick={moveToBack} className="pl-12">
					이전으로 돌아가기
				</button>
			</div>
		</div>
	);
};

export default Signup;

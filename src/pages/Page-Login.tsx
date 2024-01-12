import SignInForm from "@/components/SignIn/SignInForm";
import getUserIdFromLocalStorage from "@/utils/getUserIdFromLocalStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const isLoggedInUser = !!getUserIdFromLocalStorage();

	const moveToSignup = () => {
		navigate("/signup");
	};

	const moveToBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (isLoggedInUser) {
			navigate("/home");
		}
	}, [isLoggedInUser, navigate]);

	return (
		<div>
			<div className="my-56 text-center text-24">로그인</div>
			<SignInForm />
			<section
				className="flex justify-center
                          py-10
                          text-14
                          desktop:text-18 
      "
			>
				<button onClick={moveToSignup} className="pr-12">
					회원가입
				</button>
				|
				<button onClick={moveToBack} className="pl-12">
					이전으로 돌아가기
				</button>
			</section>
		</div>
	);
};

export default Login;

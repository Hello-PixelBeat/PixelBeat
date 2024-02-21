import VisitorIcon from "@/assets/svgs/VisitorIcon.svg?react";
import EmailIcon from "@/assets/svgs/EmailIcon.svg?react";
import GoogleIcon from "@/assets/svgs/GoogleIcon.svg?react";
import KakaoIcon from "@/assets/svgs/KakaoIcon.svg?react";
import { StandardButton } from "@/components";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/images/Logo.png";
import { signInWithGoogle, signInWithKakao } from "@/api/supabase/authApis";

const Entry = () => {
	const navigate = useNavigate();

	const moveToSignup = () => {
		navigate("/signup");
	};

	const moveToSignIn = () => {
		navigate("/login");
	};

	const moveToHome = () => {
		navigate("/home");
	};

	return (
		<div className="px-20 desktop:px-60">
			<img
				className="mx-auto 
        mt-[20svh] w-280
        desktop:mt-[12svh] desktop:w-500"
				src={Logo}
				alt="logo image"
			/>
			<div className="h-[14svh] desktop:h-[10svh]" />
			<div className="relative flex flex-col items-center gap-6">
				<StandardButton
					className={"h-56 w-356 desktop:h-60 desktop:w-[500px]"}
					fillColor="#57FF57"
					text="이메일로 로그인"
					onClick={moveToSignIn}
				>
					<EmailIcon
						className="absolute left-18 
      top-14 z-10 h-30 w-30 desktop:left-31 desktop:top-13 desktop:h-35 desktop:w-35"
					/>
				</StandardButton>
				<StandardButton
					className={"h-56 w-356 desktop:h-60 desktop:w-[500px]"}
					fillColor="white"
					text="구글로 시작하기"
					onClick={signInWithGoogle}
				>
					<GoogleIcon
						className="absolute left-18 
      top-14 z-10 h-30 w-30 desktop:left-31 desktop:top-13 desktop:h-35 desktop:w-35"
					/>
				</StandardButton>
				<StandardButton
					className={"h-56 w-356 desktop:h-60 desktop:w-[500px]"}
					fillColor="#FFFF57"
					text="카카오로 시작하기"
					onClick={signInWithKakao}
				>
					<KakaoIcon
						className="absolute left-18 
      top-14 z-10 h-30 w-30 desktop:left-31 desktop:top-13 desktop:h-35 desktop:w-35"
					/>
				</StandardButton>

				<StandardButton
					className={"h-56 w-356 text-mainBlack desktop:h-60 desktop:w-[500px]"}
					fillColor="#C3C3C3"
					text="비회원으로 구경하기"
					onClick={moveToHome}
				>
					<VisitorIcon
						className="absolute left-18 
      top-14 z-10 h-30 w-30 desktop:left-31 desktop:top-13 desktop:h-35 desktop:w-35"
					/>
				</StandardButton>
			</div>

			<div className="mt-16 flex justify-center pb-10">
				<button onClick={moveToSignup} className="pr-12 text-16">
					이메일로 회원가입
				</button>
				|<button className="pl-12 text-16">문의하기</button>
			</div>
		</div>
	);
};

export default Entry;

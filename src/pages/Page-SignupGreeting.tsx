const SignupGreeting = () => {
	return (
		<div className="portal-background fixed left-1/2 top-0 h-[100svh] w-[390px] -translate-x-1/2 desktop:w-[720px]">
			<div className="relative flex h-[100svh] w-full items-center justify-center">
				<div className="flex h-160 w-300 items-center justify-center border-2 border-mainBlack bg-mainWhite desktop:h-230 desktop:w-450 ">
					<div className="flex h-150 w-290 items-center justify-center border-4 border-mainBlack px-40 desktop:h-220 desktop:w-440">
						<p className="text-center text-16 text-mainBlack desktop:text-28">
							PIXELBEAT를 시작하기 전 <br />
							사용자 확인을 위해 <br />
							메일함을 확인해주세요!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupGreeting;

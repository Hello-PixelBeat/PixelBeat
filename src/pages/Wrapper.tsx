import { Spinner } from "@/components";
import BackgroundScreen from "@/components/common/BackgroundScreen";
import MusicPlayerBar from "@/components/musicPlayer/MusicPlayerBar";
import Portal from "@/utils/portal";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

const regexShow =
	/^(?!\/$|\/recommend|\/entry|\/signupwithemail|\/signinwithemail|\/profileedit).+/;

const Wrapper = () => {
	const isLoggedin = useUserStore((state) => state.userInfo.id);
	const currentTrack = usePlayNowStore((state) => state.currentTrack);
	const { pathname } = useLocation();
	const isShowMusicPlayerBar = regexShow.test(pathname);
	const isDownMusicPlayerBar =
		pathname.includes("/bill/") &&
		pathname.split("/").length <= 4 &&
		!pathname.split("/")[3];

	return (
		<div>
			<BackgroundScreen />
			<div className="layout-screen-width z-1 relative bg-mainBlack desktop:border-[1.8px] desktop:pt-[22.5px] desktop:outline-none middle:outline">
				<div className="topbar fixed left-1/2 top-0 z-20 hidden w-[720px] translate-x-[-50%] desktop:block" />
				<Suspense fallback={<Spinner />}>
					<Outlet />

					<Portal>
						{isShowMusicPlayerBar && currentTrack && (
							<MusicPlayerBar
								propsClassName={
									!isLoggedin && isDownMusicPlayerBar
										? "bottom-0 border-x-white border-x-[1.8px] desktop:border-x-0"
										: "bottom-66 border border-t-0 desktop:border-x-white desktop:border-x-[1.8px] border-b-mainGray"
								}
							/>
						)}
					</Portal>
				</Suspense>
			</div>
		</div>
	);
};

export default Wrapper;

import BackgroundScreen from "@/components/common/BackgroundScreen";
import Spinner from "@/components/common/Spinner";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
	return (
		<div>
			<BackgroundScreen />
			<div className="layout-screen-width z-1 relative bg-mainBlack desktop:border-[1.8px] desktop:pt-[22.5px] desktop:outline-none middle:outline">
				<div className="topbar fixed left-1/2 top-0 z-20 hidden w-[720px] translate-x-[-50%] desktop:block" />
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
};

export default Wrapper;

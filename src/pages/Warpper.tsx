import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Warpper = () => {
	return (
		<div className="layout-screen-width border-1">
			<Suspense fallback={<p>suspense loading...</p>}>
				<Outlet />
			</Suspense>
		</div>
	);
};

export default Warpper;

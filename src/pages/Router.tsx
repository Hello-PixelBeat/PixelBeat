import { ROUTE_CONFIG, ROUTES } from "@/constants/routes";
import React from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Wrapper from "./Wrapper";
import ErrorComponent from "@/components/common/ErrorComponent";
import loadTokenAndCheckExpiration from "@/utils/loadTokenAndCheckExpiration";
import navigateAfterSignInWithOAuth from "@/utils/navigateAfterSignInWithOAuth";

const LazyRoutes = ROUTES.map((route) => {
	const { index, path, authentication } = ROUTE_CONFIG[route] || {
		index: false,
		path: route.toLowerCase(),
		authentication: false,
	};

	const LazyComponent = React.lazy(() => import(`./Page-${route}.tsx`));

	const RouteComponent = authentication ? PrivateRoute : PublicRoute;

	return (
		<Route
			key={route}
			index={index}
			path={path}
			element={<RouteComponent LazyComponent={LazyComponent} />}
			loader={
				route === "Home"
					? async () => navigateAfterSignInWithOAuth()
					: undefined
			}
		/>
	);
});

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Wrapper />}
			errorElement={<ErrorComponent />}
			loader={() => loadTokenAndCheckExpiration()}
		>
			{LazyRoutes}
		</Route>,
	),
);

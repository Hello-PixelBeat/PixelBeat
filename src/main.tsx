import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/pages/Router";
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			console.error(`Something went wrong: ${error}`);
		},
	}),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<>
		<QueryClientProvider client={queryClient}>
			<HelmetProvider>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</HelmetProvider>
		</QueryClientProvider>
	</>,
);

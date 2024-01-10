import useUserInfo from "@/hooks/useUserInfo";
import getUserIdFromLocalStorage from "@/utils/getUserIdFromLocalStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
	LazyComponent: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ LazyComponent }) => {
	const userId = getUserIdFromLocalStorage();
	const navigate = useNavigate();
	useUserInfo();
	useEffect(() => {
		if (!userId) {
			navigate("/home");
		}
	}, []);
	return <LazyComponent />;
};

export default PrivateRoute;

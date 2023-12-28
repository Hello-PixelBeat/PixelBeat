import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
	authentication?: boolean;
	LazyComponent: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	authentication,
	LazyComponent,
}) => {
	const navigate = useNavigate();
	if (authentication) {
		navigate("/home");
	}
	return <LazyComponent />;
};

export default PrivateRoute;

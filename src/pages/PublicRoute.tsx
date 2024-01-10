import useUserInfo from "@/hooks/useUserInfo";

interface PublicRouteProps {
	LazyComponent: React.FC;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ LazyComponent }) => {
	useUserInfo();
	return <LazyComponent />;
};

export default PublicRoute;

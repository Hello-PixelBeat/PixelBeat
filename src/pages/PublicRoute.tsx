interface PublicRouteProps {
	LazyComponent: React.FC;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ LazyComponent }) => {
	return <LazyComponent />;
};

export default PublicRoute;

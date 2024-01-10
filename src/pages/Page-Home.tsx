import { Spinner } from "@/components";
import useUserInfo from "@/hooks/useUserInfo";

const Home = () => {
	const { isLoading } = useUserInfo();

	if (isLoading) return <Spinner text={"메인 페이지 불러오는 중..."} />;
	return <div>Page-Home</div>;
};

export default Home;

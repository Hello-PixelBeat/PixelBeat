import Header from "@/components/common/Header";
import Banner from "@/components/home/Banner";
import PopularUserList from "@/components/home/PopularUserList";
import Top50TrackList from "@/components/home/Top50TrackList";

const Home = () => {
	return (
		<div className="relative h-[100svh] overflow-y-auto">
			<Header />
			<Banner />
			<PopularUserList />
			<Top50TrackList />
		</div>
	);
};

export default Home;

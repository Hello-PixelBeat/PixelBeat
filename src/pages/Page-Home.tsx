import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import Banner from "@/components/home/Banner";
import PopularUserList from "@/components/home/PopularUserList";
import Top50TrackList from "@/components/home/Top50TrackList";

const Home = () => {
	return (
		<div className="relative h-screen overflow-y-auto">
			<Header />
			<Banner />
			<PopularUserList />
			<Top50TrackList />
			<NavBar />
		</div>
	);
};

export default Home;

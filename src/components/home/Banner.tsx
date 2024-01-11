import { useQueries } from "@tanstack/react-query";
import getPlaylistFromSpotify from "@/api/spotify/playlistApi";
import BannerItem from "./BannerItem";
import BANNER_DATA from "@/constants/bannerText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SLIDER_SETTINGS = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	autoplay: true,
};

const Banner = () => {
	const queryResults = useQueries({
		queries: BANNER_DATA.map((query) => {
			const [key, value] = Object.entries(query)[0];
			return {
				queryKey: [`${key}`, value],
				queryFn: () => getPlaylistFromSpotify(value),
				staleTime: 1000 * 60 * 60 * 24,
			};
		}),
	});

	const isLoading = queryResults.some((result) => result.isLoading);
	const isError = queryResults.some((result) => result.isError);

	return (
		<div className="relative">
			<Slider {...SLIDER_SETTINGS}>
				{queryResults.map((result, idx) => (
					<BannerItem key={idx} result={result} />
				))}
			</Slider>
		</div>
	);
};

export default Banner;

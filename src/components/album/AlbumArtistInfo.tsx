import getAllTracksDuration from "@/utils/getAllTracksDuration";
import msToMinutesAndSeconds from "@/utils/msToMinutesAndSeconds";
import { useNavigate } from "react-router-dom";
import { StandardVertex } from "..";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";

const AlbumArtistInfo = ({ album_data }: any) => {
	const navigate = useNavigate();

	const { id, name, artists, release_date, total_tracks, images, tracks } =
		album_data;

	const handleClickAritst = (id: string) => {
		navigate(`/artistinfo/${id}`);
	};

	const allTrackDuration = getAllTracksDuration({ tracks: tracks.items });
	const { minutes, seconds } = msToMinutesAndSeconds(allTrackDuration);

	const mobileImageSize = "w-198 h-198";
	const desktopImageSize = "desktop:w-300 desktop:h-300";

	return (
		<div className="px-20 desktop:px-60" key={id}>
			<div className="relative flex justify-center">
				<StandardVertex
					className={`absolute text-black ${mobileImageSize} ${desktopImageSize}`}
				/>
				<img
					className={` ${mobileImageSize} ${desktopImageSize}`}
					src={images[0] ? images[0].url : defaultAlbumImage}
					alt={name + "image"}
				/>
			</div>
			<div className="relative h-90 w-full overflow-hidden desktop:h-120">
				<h1
					className={`absolute
                      top-10 text-40
                      desktop:left-0 desktop:top-10 desktop:text-60
                     ${name.length >= 15 ? "text-flow-on-hover" : ""}`}
				>
					{name}
				</h1>
				<h2 className="absolute top-70 text-14 desktop:left-0 desktop:top-90 desktop:text-24">
					<p>
						{artists.map((artist: any, idx: any) => (
							<span
								key={idx}
								className="cursor-pointer hover:underline"
								onClick={() => handleClickAritst(artist.id)}
							>
								{artist.name}
								{idx < artists.length - 1 && ", "}
							</span>
						))}{" "}
						• {release_date.split("-")[0]} • {total_tracks}곡,
						{` ${minutes}분 ${seconds}초`}
					</p>
				</h2>
			</div>
		</div>
	);
};

export default AlbumArtistInfo;

import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import { StandardVertex } from "..";

const ArtistImage = ({ artist_info }: any) => {
	const imageSizeClass = "w-198 h-198 desktop:w-300 desktop:h-300";

	return (
		<div className="px-20 desktop:px-60">
			{artist_info &&
				artist_info.map((artist: any) => (
					<div key={artist.id}>
						<div className="relative flex justify-center">
							<StandardVertex
								className={`absolute text-black ${imageSizeClass}`}
							/>

							<img
								className={`${imageSizeClass}`}
								src={
									artist.images[1] ? artist.images[1].url : defaultAlbumImage
								}
								alt={`${artist.name}.img`}
							/>
						</div>
						<div className="relative flex h-90 w-full items-center overflow-hidden desktop:h-120">
							<h1
								className={`absolute
                            top-10 text-40
                            desktop:left-0 desktop:top-10 desktop:text-60
                            ${
															artist.name.length >= 20
																? "text-flow-on-hover"
																: ""
														}`}
							>
								{artist.name}
							</h1>

							<h2 className="absolute top-70 text-14 desktop:left-0 desktop:top-90 desktop:text-24">
								팔로워: {artist.followers.total}명
							</h2>
						</div>
					</div>
				))}
		</div>
	);
};
export default ArtistImage;

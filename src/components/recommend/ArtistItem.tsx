import { ArtistItemProps } from "@/types/recommendTypes";
import {
	StandardPixelBorder,
	StandardVertex,
} from "@/components/svgComponents";

const ArtistItem = ({ artist, isSelected, onClick }: ArtistItemProps) => {
	return (
		<div key={artist.id} className="mb-20" onClick={() => onClick(artist.id)}>
			<div className="relative">
				<img
					src={artist.images[0].url}
					alt={artist.name}
					className="absolute left-32 top-16 h-48 w-48 cursor-pointer desktop:left-62"
				/>
				<StandardVertex className="absolute left-32 top-16 h-48 w-48 text-black desktop:left-62" />
				<StandardPixelBorder
					className={`cursor-pointer desktop:px-20 ${
						isSelected ? "text-mainGreen" : ""
					}`}
				/>
				<div
					className={`absolute left-100 top-24 desktop:left-130 ${
						isSelected ? "text-mainGreen" : ""
					} cursor-pointer text-xl`}
				>
					{artist.name}
				</div>
			</div>
		</div>
	);
};

export default ArtistItem;

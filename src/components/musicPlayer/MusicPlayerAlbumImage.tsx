import { StandardVertex } from "@/components/svgComponents";

interface AlbumImageProps {
	imageUrl: string;
	altText: string;
}

const MusicPlayerAlbumImage = ({ imageUrl, altText }: AlbumImageProps) => (
	<div className="relative mr-8 shrink-0 cursor-pointer">
		<img src={imageUrl} alt={altText} className="h-48 w-48" />
		<StandardVertex className="absolute top-0 h-48 text-black" />
	</div>
);

export default MusicPlayerAlbumImage;

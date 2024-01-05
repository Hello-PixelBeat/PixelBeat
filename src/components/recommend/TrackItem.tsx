import {
	StandardPixelBorder,
	StandardVertex,
} from "@/components/svgComponents";
import { Track } from "@/types/recommendTypes";

interface TrackItemProps {
	id: string;
	onClick: (id: string) => any;
	track: Track;
	isSelected: boolean;
}

const TrackItem = ({ id, onClick, track, isSelected }: TrackItemProps) => {
	return (
		<div
			key={id}
			className="relative mb-20 cursor-pointer"
			onClick={() => onClick(track.id)}
		>
			<img
				src={track.album.images[0].url}
				alt={`${track.name} + image`}
				className="absolute left-32 top-16 h-48 w-48 desktop:left-62"
			/>

			{/* SVG */}
			<StandardVertex
				className={`absolute left-32 top-16 h-48 w-48 text-black desktop:left-62`}
			/>
			<StandardPixelBorder
				className={`desktop:px-20 ${isSelected ? "text-mainGreen" : ""}`}
			/>

			{/* 노래 제목 */}
			<div
				className={`absolute left-100 top-12 w-[220px] overflow-hidden whitespace-nowrap desktop:left-130 desktop:w-[432px] ${
					isSelected ? "text-mainGreen" : ""
				}`}
			>
				<div
					className={`${track.name.length >= 38 ? "text-flow-on-hover" : ""}`}
				>
					<p>{track.name}</p>
				</div>
			</div>

			{/* 아티스트 이름 */}
			<div
				className={`absolute left-100 top-40 w-[250px] whitespace-nowrap desktop:left-130 desktop:w-[500px] ${
					isSelected ? "text-mainGreen" : ""
				}`}
			>
				{track.artists[0].name}
			</div>
		</div>
	);
};

export default TrackItem;

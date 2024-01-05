import { TrackInfoProps } from "@/types/playerTypes";

const TrackInfo = ({ name, artists }: TrackInfoProps) => {
	return (
		<div className="flex-1 basis-196 cursor-pointer overflow-hidden leading-[1.1]">
			<h5
				className={`text-16 desktop:text-20 ${
					name.length > 20 && "text-flow-on-hover"
				}`}
			>
				{name}
			</h5>
			<p
				className={`text-12 text-mainGray200 desktop:text-16 ${
					artists.length > 3 && "text-flow-on-hover"
				}`}
			>
				{artists.map((artist: any, idx: any) => (
					<span className="hover:underline" key={idx}>
						{artist.name}
						{idx < artists.length - 1 && ", "}
					</span>
				))}
			</p>
		</div>
	);
};

export default TrackInfo;

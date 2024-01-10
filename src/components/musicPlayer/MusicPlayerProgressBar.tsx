import progressDot from "@/assets/images/progressDot.png";
import { PLAYBACK_TEXT } from "@/constants/playbackText";
import  usePlayNowStore  from "@/zustand/playNowStore";

type ProgressBartProps = {
	audioRef: React.RefObject<HTMLAudioElement>;
	isPlayNow?: boolean;
};

const MusicPlayerProgressBar = ({
	audioRef,
	isPlayNow = false,
}: ProgressBartProps) => {
	const { playingPosition, setPlayingPosition } = usePlayNowStore();

	const handleChangePlayingPosition = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPlayingPosition(+e.target.value);

		const audioDuration = audioRef.current?.duration || 0;
		const newPosition = Math.round(audioDuration * (+e.target.value / 100));
		audioRef.current!.currentTime = newPosition;
	};

	return (
		<div className="relative">
			<div className="w-inherit relative h-3 bg-mainWhite">
				<div
					className={`h-3 bg-mainGreen transition-all duration-100 ease-linear`}
					style={{ width: `${playingPosition}%` }}
				></div>
				<div
					className="absolute top-[-5px] w-12 transition-all duration-100 ease-linear desktop:top-[-9px] desktop:w-18"
					style={{
						left: `${
							isPlayNow
								? playingPosition
								: playingPosition < 97.8
									? playingPosition
									: 97.8
						}%`,
					}}
				>
					<img src={progressDot} alt={PLAYBACK_TEXT.PROGRESS_DOT_ALT} />
				</div>
			</div>
			<label htmlFor="musicPlayingPosition" className="a11y-hidden">
				{PLAYBACK_TEXT.LABEL}
			</label>
			<input
				type="range"
				id="musicPlayingPosition"
				className="progressbar"
				min="0"
				max="100"
				step="0.5"
				value={playingPosition}
				onChange={handleChangePlayingPosition}
			/>
		</div>
	);
};

export default MusicPlayerProgressBar;

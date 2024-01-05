import PlayerPlayButton from "@/assets/svgs/PlayerPlayButton.svg?react";
import PlayerPauseButton from "@/assets/svgs/PlayerPauseButton.svg?react";
import PlayerPrevButton from "@/assets/svgs/PlayerPrevButton.svg?react";
import PlayerNextButton from "@/assets/svgs/PlayerNextButton.svg?react";
import { PlayerControlsProps } from "@/types/playerTypes";

const PlayerControls = ({
	handleClickPrevButton,
	handleClickPlayButton,
	handleClickNextButton,
	isPlaying,
}: PlayerControlsProps) => {
	return (
		<section className="ml-18 h-24 shrink-0">
			<button
				type="button"
				className="mr-10 w-24 hover:text-mainGreen"
				onClick={handleClickPrevButton}
			>
				<PlayerPrevButton />
			</button>
			<button
				type="button"
				onClick={handleClickPlayButton}
				className="mr-10 w-24 hover:text-mainGreen"
			>
				{isPlaying ? <PlayerPauseButton /> : <PlayerPlayButton />}
			</button>
			<button
				type="button"
				className="w-24 hover:text-mainGreen"
				onClick={handleClickNextButton}
			>
				<PlayerNextButton />
			</button>
		</section>
	);
};

export default PlayerControls;

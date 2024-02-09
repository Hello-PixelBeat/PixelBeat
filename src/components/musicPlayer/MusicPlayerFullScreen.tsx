import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import { StandardVertex } from "..";
import MusicPlayerProgressBar from "./MusicPlayerProgressBar";
import PlayerPrevButton from "@/assets/svgs/PlayerPrevButton.svg?react";
import PlayerNextButton from "@/assets/svgs/PlayerNextButton.svg?react";
import MusicList from "@/assets/svgs/MusicList.svg?react";
import SoundOff from "@/assets/svgs/SoundOff.svg?react";
import SoundOn from "@/assets/svgs/SoundOn.svg?react";
import CirclePlay from "@/assets/svgs/CirclePlay.svg?react";
import CirclePause from "@/assets/svgs/CirclePause.svg?react";
import { MusicPlayerFullScreenProps } from "@/types/playerTypes";
import { useShallow } from "zustand/react/shallow";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";

const MusicPlayerFullScreen = ({
	playAndPauseNowPlay,
	clickPrevButton,
	clickNextButton,
	audioRef,
}: MusicPlayerFullScreenProps) => {
	const navigate = useNavigate();
	const userId = useUserStore((state) => state.userInfo.id);
	const isMusicDrawer = useMusicDrawerStore((state) => state.isMusicDrawer);
	const { isShow, isVisible, closeModal } = useModal();
	const [isPlaying, currentTrack] = isMusicDrawer
		? useMusicDrawerStore(
				useShallow((state) => [
					state.isPlaying_MusicDrawer,
					state.currentTrack_MusicDrawer,
				]),
			)
		: usePlayNowStore(
				useShallow((state) => [state.isPlaying, state.currentTrack]),
			);

	const [isMuted, setIsMuted] = useState<boolean>(
		audioRef ? audioRef.current?.muted! : false,
	);

	const handleClickSoundButton = () => {
		setIsMuted((prevMuted) => !prevMuted);
		if (audioRef.current) {
			audioRef.current.muted = !isMuted;
		}
	};

	if (!isVisible) return null;

	const handleClickListButton = () => {
		closeModal();
		if (userId) {
			navigate(`/mymusic`);
		}
	};

	return (
		<div
			className={`${
				isShow ? "open-fullScreen" : "closing-fullScreen"
			} absolute left-[50%] top-0 h-[calc(100svh-10px)] w-390 translate-x-[-50%] bg-mainBlack pt-10 desktop:w-[720px] desktop:pt-30`}
		>
			<Header type="musicPlayerFullScreen" onClickRightButton={closeModal} />

			{/* IMAGE + TEXT + PROGRESS WRPPER */}
			<div className="flex h-[calc(100svh-360px)] flex-col justify-between pt-16 ">
				{/* IMAGE */}
				<div className="relative mx-auto aspect-square w-[36svh] min-w-224">
					<img
						src={
							currentTrack!.album.images[0]
								? currentTrack!.album.images[0].url
								: defaultAlbumImage
						}
						alt={currentTrack!.album.name}
					/>
					<StandardVertex className="absolute top-0 aspect-square w-[36.2svh] min-w-224 text-black" />
				</div>
				{/* TEXT */}
				<div className="mx-auto mt-10 w-[calc(100%-20px)] shrink-0 overflow-x-hidden px-20 desktop:px-60">
					<h2
						className={`text-20 desktop:text-28 ${
							currentTrack!.name.length > 20 && "text-flow-on-hover"
						}`}
					>
						{currentTrack!.name}
					</h2>
					<p
						className={`text-16 desktop:text-20 ${
							currentTrack!.artists.length > 3 && "text-flow-on-hover"
						}`}
					>
						{currentTrack!.artists.map((artist, idx) => (
							<span className="cursor-pointer hover:underline" key={idx}>
								{artist.name}
								{idx < currentTrack!.artists.length - 1 && ", "}
							</span>
						))}
					</p>
				</div>
				{/* PROGRESS */}
				<div className="ml-10 mt-15 h-30 w-[calc(100%-20px)] shrink-0 px-20 desktop:px-60 ">
					<MusicPlayerProgressBar audioRef={audioRef} isPlayNow />
				</div>
			</div>

			{/* BUTTON LIST */}
			<section className="playnowCircle">
				<MusicList
					type="button"
					className="playnowBtn"
					onClick={handleClickListButton}
				/>

				<div className="flex flex-shrink-0 items-center gap-26 mobile:gap-36 desktop:gap-36">
					<PlayerPrevButton
						type="button"
						className="playnowBtn"
						onClick={clickPrevButton}
					/>

					<button
						type="button"
						onClick={playAndPauseNowPlay}
						className="hover:text-mainGreen"
					>
						{isPlaying ? <CirclePause /> : <CirclePlay />}
					</button>

					<PlayerNextButton
						type="button"
						className="playnowBtn"
						onClick={clickNextButton}
					/>
				</div>
				<button
					type="button"
					className="playnowBtn"
					onClick={handleClickSoundButton}
				>
					{isMuted ? <SoundOff /> : <SoundOn />}
				</button>
			</section>
		</div>
	);
};

export default MusicPlayerFullScreen;

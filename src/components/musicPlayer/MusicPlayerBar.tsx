import { useModal } from "@/hooks/useModal";
import usePlayerControls from "@/hooks/usePlayerControls";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import MusicPlayerProgressBar from "./MusicPlayerProgressBar";
import { useEffect } from "react";
import Portal from "@/utils/portal";
import MusicPlayerFullScreen from "./MusicPlayerFullScreen";
import { MusicPlayerBarProps } from "@/types/playerTypes";
import PlayerControls from "./MusicPlayerControls";
import TrackInfo from "./PlayerTrackInfo";
import MusicPlayerAlbumImage from "./MusicPlayerAlbumImage";

const MusicPlayerBar = ({ propsClassName }: MusicPlayerBarProps) => {
	const {
		handleClickPlayButton: playToggle,
		handleClickNextButton: nextBtn,
		handleClickPrevButton: prevBtn,
		audioRef,
		intervalIdRef,
		currentTrack,
		isPlaying,
		startPlayback,
	} = usePlayerControls();

	useEffect(() => {
		if (isPlaying) {
			startPlayback();
		}

		return () => {
			audioRef.current = null;
			
      if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
		};
	}, []);

	const { openModal, modalType } = useModal();

	const openMusicPlayerFullScreen = () => {
		openModal("musicPlayerFullScreen");
	};

	const handleClickPrevButton = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation();
		prevBtn();
	};

	const handleClickPlayButton = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation();
		playToggle();
	};

	const handleClickNextButton = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation();
		nextBtn();
	};

	const { name, album, artists, preview_url } = currentTrack || {
		name: "",
		album: { images: [{ url: "" }] },
		artists: [],
		duration_ms: 0,
		preview_url: "",
	};

	return (
		<>
			<aside
				className={`fixed left-[50%] w-full translate-x-[-50%] bg-mainBlack mobile:w-392 desktop:w-[720px] ${propsClassName}`}
			>
				<MusicPlayerProgressBar audioRef={audioRef} />
				<audio ref={audioRef} src={preview_url} loop={false} />
				<div
					onClick={openMusicPlayerFullScreen}
					className="mx-auto flex h-68 items-center justify-center px-20 desktop:px-60"
				>
					<MusicPlayerAlbumImage
						imageUrl={album.images[2] ? album.images[2].url : defaultAlbumImage}
						altText={album.name!}
					/>
					<TrackInfo name={name} artists={artists} />
					<PlayerControls
						handleClickPrevButton={handleClickPrevButton}
						handleClickPlayButton={handleClickPlayButton}
						handleClickNextButton={handleClickNextButton}
						isPlaying={isPlaying}
					/>
				</div>
			</aside>

			<Portal>
				{modalType === "musicPlayerFullScreen" && (
					<MusicPlayerFullScreen
						audioRef={audioRef}
						playAndPauseNowPlay={playToggle}
						clickNextButton={nextBtn}
						clickPrevButton={prevBtn}
					/>
				)}
			</Portal>
		</>
	);
};

export default MusicPlayerBar;

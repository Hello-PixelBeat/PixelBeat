import { useModal } from "@/hooks/useModal";
import usePlayerControlsMusicDrawer from "@/hooks/usePlayerControlsMusicDrawer";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import MusicPlayerProgressBar from "./MusicPlayerProgressBar";
import { useEffect } from "react";
import Portal from "@/utils/portal";
import MusicPlayerFullScreen from "./MusicPlayerFullScreen";
import { MusicPlayerBarProps } from "@/types/playerTypes";
import PlayerControls from "./MusicPlayerControls";
import TrackInfo from "./PlayerTrackInfo";
import MusicPlayerAlbumImage from "./MusicPlayerAlbumImage";

const MusicPlayerBarMusicDrawer = ({ propsClassName }: MusicPlayerBarProps) => {
	const {
		handleClickPlayButton: playToggle,
		handleClickNextButton: nextBtn,
		handleClickPrevButton: prevBtn,
		audioRef,
		intervalIdRef,
		currentTrack,
		isPlaying,
		startPlayback,
	} = usePlayerControlsMusicDrawer();

	// 음악 서랍서 재생중인지 재생목록서 아닌지 체크 및 세터
	const setIsPlaying_MusicDrawer = useMusicDrawerStore(
		(state) => state.setIsPlaying_MusicDrawer,
	);

	// 새로고침 시 전역 상태(isPlaying)를 false로 설정하는 useEffect
	useEffect(() => {
		const handleBeforeUnload = () => {
			setIsPlaying_MusicDrawer(false);
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [setIsPlaying_MusicDrawer]);

	// intervalIdRef의 변경에 대한 처리를 위한 useEffect
	useEffect(() => {
		return () => {
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
		};
	}, [isPlaying]);

	// isPlaying이 변경될 때 음악을 재생하거나 중지하는 useEffect
	useEffect(() => {
		if (isPlaying) {
			startPlayback();
		}
		return () => {
			audioRef.current = null;
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

export default MusicPlayerBarMusicDrawer;

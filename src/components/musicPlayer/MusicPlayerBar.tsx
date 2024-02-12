import { useModal } from "@/hooks/useModal";
import usePlayerControls from "@/hooks/usePlayerControls";
import usePlayNowStore from "@/zustand/playNowStore";
import usePlayerControlsLocal from "@/hooks/usePlayerControlsLocal";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";
import defaultAlbumImage from "@/assets/images/defaultAlbumImage.png";
import { StandardVertex } from "@/components/svgComponents";
import MusicPlayerProgressBar from "./MusicPlayerProgressBar";
import { useEffect, useState } from "react";
import Portal from "@/utils/portal";
import MusicPlayerFullScreen from "./MusicPlayerFullScreen";
import { MusicPlayerBarProps } from "@/types/playerTypes";
import PlayerControls from "./MusicPlayerControls";
import TrackInfo from "./PlayerTrackInfo";
import { useShallow } from "zustand/react/shallow";

interface AlbumImageProps {
	imageUrl: string;
	altText: string;
}

const AlbumImage = ({ imageUrl, altText }: AlbumImageProps) => (
	<div className="relative mr-8 shrink-0 cursor-pointer">
		<img src={imageUrl} alt={altText} className="h-48 w-48" />
		<StandardVertex className="absolute top-0 h-48 text-black" />
	</div>
);

const MusicPlayerBar = ({ propsClassName }: MusicPlayerBarProps) => {
	// 음악 서랍인지 아닌지 판별
	const isMusicDrawer = useMusicDrawerStore((state) => state.isMusicDrawer);
	const [isMusicDrawerState, setIsMusicDrawerState] = useState(isMusicDrawer);

	// 음악 서랍서 재생중인지 아닌지 판별
	const isPlaying_MusicDrawerState = useMusicDrawerStore(
		(state) => state.isPlaying_MusicDrawer,
	);
	const setIsPlaying_MusicDrawer = useMusicDrawerStore(
		(state) => state.setIsPlaying_MusicDrawer,
	);

	const [musicDrawerPlayCheck, setMusicDrawerPlayCheck] = useState(
		isPlaying_MusicDrawerState,
	);

	// 첫 마운트시에 로컬스토리지의 재생 현황 체크하고 true일 경우 기본값으로 변경하기 위한 useEffect
	useEffect(() => {
		if (isPlaying_MusicDrawerState) {
			setIsPlaying_MusicDrawer(false);
			setMusicDrawerPlayCheck(false);
		}
	}, [musicDrawerPlayCheck]);

	let usePlayerControlsHook = isMusicDrawerState
		? usePlayerControlsLocal
		: usePlayerControls;

	const [isPlaying, currentTrack] = isMusicDrawerState
		? useMusicDrawerStore(
				useShallow((state) => [
					state.isPlaying_MusicDrawer,
					state.currentTrack_MusicDrawer,
				]),
			)
		: usePlayNowStore(
				useShallow((state) => [state.isPlaying, state.currentTrack]),
			);

	const {
		handleClickPlayButton: playToggle,
		handleClickNextButton: nextBtn,
		handleClickPrevButton: prevBtn,
		audioRef,
		intervalIdRef,
		startPlayback,
	} = usePlayerControlsHook();

	useEffect(() => {
		if (isPlaying) {
			startPlayback();
		}

		return () => {
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
		};
	}, [isPlaying]);

	const { name, album, artists, preview_url } = currentTrack || {
		name: "",
		album: { images: [{ url: "" }] },
		artists: [],
		duration_ms: 0,
		preview_url: "",
	};

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
					<AlbumImage
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

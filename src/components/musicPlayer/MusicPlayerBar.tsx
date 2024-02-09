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
	const isMusicDrawer = useMusicDrawerStore((state) => state.isMusicDrawer);

	let usePlayerControlsHook = isMusicDrawer
		? usePlayerControlsLocal
		: usePlayerControls;

    // isMusicDrawer의 값에 따라서 usePlayerControlsHook랑 isPlaying, currentTrack이 바뀐다는것을
    // useEffect안에서 zustand subscribe함수를 써서 사용해보기




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

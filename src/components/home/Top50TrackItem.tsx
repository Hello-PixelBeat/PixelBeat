import { addCurrentTrackTable } from "@/api/supabase/profilesTableAccessApis";
import useSwipe from "@/hooks/useSwipe";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useNavigate } from "react-router-dom";
import { CirclePlaySmall, StandardPixelBorder, StandardVertex } from "..";
import defaultAlbumImg from "@/assets/images/defaultAlbumImage.png";
import { Top50TrackProps, Track } from "@/types/recommendTypes";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import { useShallow } from "zustand/react/shallow";

const Top50TrackItem = ({ tracks }: { tracks: Top50TrackProps[] }) => {
	const navigate = useNavigate();
	const [setCurrentTrack, setIsPlaying, addTrackToNowPlay] = usePlayNowStore(
		useShallow((state) => [
			state.setCurrentTrack,
			state.setIsPlaying,
			state.addTrackToNowPlay,
		]),
	);
	const userInfo = useUserStore((state) => state.userInfo);
	const setIsMusicDrawer = useMusicDrawerStore(
		(state) => state.setIsMusicDrawer,
	);

	//현재재생목록에 추가 및 지금 재생
	const { mutate: addCurrentTrackTableMutation } =
		useUpdateProfileMutation(addCurrentTrackTable);

	const handleClickPlayButton = (track: Track) => {
		setCurrentTrack(track);
		addTrackToNowPlay(track);
		setIsPlaying(true);
		setIsMusicDrawer(false);
		//로그인 유저 db update
		if (userInfo.id) {
			addCurrentTrackTableMutation({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				track,
				userId: userInfo.id,
			});
		}
	};
	const handleClickAlbum = (id: string) => {
		navigate(`/albuminfo/${id}`);
	};

	const handleClickAritst = (id: string) => {
		navigate(`/artistinfo/${id}`);
	};

	const {
		isDrag,
		scrollRef,
		onDragStart: handleDragStart,
		onDragMove: handleDragMove,
		onDragEnd: handleDragEnd,
	} = useSwipe();

	return (
		<ul
			ref={scrollRef}
			onMouseDown={handleDragStart}
			onMouseMove={handleDragMove}
			onMouseUp={handleDragEnd}
			onMouseLeave={handleDragEnd}
			className="top-track-grid mb-180 mt-8 h-295 overflow-y-hidden"
		>
			{tracks &&
				tracks.map((item: Top50TrackProps, idx: any) => (
					<li
						className="group relative h-60 w-330 desktop:h-60 desktop:w-[450px]"
						key={item + idx}
					>
						<StandardPixelBorder isHeight={66} />
						<div
							className="absolute left-10 top-9 h-48 w-48 cursor-pointer"
							onClick={() => {
								if (!isDrag) handleClickAlbum(item.track.album.id);
							}}
						>
							<img
								src={
									item.track.album
										? item.track.album?.images[2]?.url
										: defaultAlbumImg
								}
							/>
							<StandardVertex className="absolute top-0 h-48 w-48 text-black" />
						</div>
						<p className="absolute left-59 top-20 w-30 text-center desktop:left-62">
							{idx + 1}
						</p>
						<div
							className={`absolute top-12 whitespace-nowrap desktop:top-10 ${
								idx >= 9 ? "left-105" : "left-90 desktop:left-100"
							} w-180 overflow-hidden text-18 leading-[1.2] desktop:w-[280px] desktop:text-20`}
						>
							<div
								className={`${
									item.track.name.length > 26 ? "text-flow-on-hover" : ""
								}`}
							>
								<p>{item.track.name}</p>
							</div>
							<p className=" text-14 desktop:text-16">
								{item.track.artists.map((artist, idx) => (
									<span
										key={idx}
										className="cursor-pointer hover:underline"
										onClick={() => {
											if (!isDrag) handleClickAritst(artist.id);
										}}
									>
										{artist.name}
										{idx < item.track.artists.length - 1 && ", "}
									</span>
								))}
							</p>
						</div>
						{item.track.preview_url && (
							<button
								className="absolute right-18 top-20 "
								onClick={() => {
									if (!isDrag) handleClickPlayButton(item.track);
								}}
							>
								<CirclePlaySmall isWhite isBig />
							</button>
						)}
					</li>
				))}
		</ul>
	);
};

export default Top50TrackItem;

import getAlbum from "@/api/spotify/albumApi";
import { addNowPlayTracklistAndPlaySongTable } from "@/api/supabase/profilesTableAccessApis";
import { Spinner, StandardButton } from "@/components";
import AlbumArtistInfo from "@/components/album/AlbumArtistInfo";
import AlbumList from "@/components/album/AlbumList";
import Header from "@/components/common/Header";
import SPINNER_TEXT from "@/constants/spinnerText";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";
import useUserInfo from "@/hooks/useUserInfo";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const Albuminfo = () => {
	const { isLoading: isUserInfoLoading } = useUserInfo();
	const { id: albumId } = useParams();
	const userInfo = useUserStore((state) => state.userInfo);
	const [nowPlayTracks, setCurrentTrack, setIsPlaying, setNowPlayList] =
		usePlayNowStore(
			useShallow((state) => [
				state.tracks,
				state.setCurrentTrack,
				state.setIsPlaying,
				state.setNowPlayList,
			]),
		);

	const { data, isLoading } = useQuery({
		queryKey: ["album", albumId],
		queryFn: () => getAlbum(albumId as string),
	});

	//전체 재생
	const { mutate: addNowPlayTracklistAndPlaySongTableMutation } =
		useUpdateProfileMutation(addNowPlayTracklistAndPlaySongTable);

	const handleClickPlayAllTrackButton = () => {
		const images = {
			album: { images: data?.images },
		};

		const billTracks = data?.tracks.items
			.map((item: any) => {
				return {
					...item,
					...images,
				};
			})
			.filter((track: any) => track.preview_url);

		setIsPlaying(true);

		const newNowPlayTracklist = [...billTracks, ...nowPlayTracks].filter(
			(item) =>
				billTracks.findIndex((track: any) => track.id === item.id) !== -1,
		);

		setNowPlayList(newNowPlayTracklist);

		setCurrentTrack(billTracks[0]);

		//로그인 유저면 db 업데이트
		if (userInfo.id) {
			addNowPlayTracklistAndPlaySongTableMutation({
				prevNowPlayTracklist: userInfo.nowplay_tracklist,
				tracks: billTracks,
				userId: userInfo.id,
			});
		}
	};

	if (isLoading || isUserInfoLoading)
		return <Spinner text={SPINNER_TEXT.ALBUMINFO_TEXT} />;

	return (
		<>
			<Header type="ALBUM_INFO" />
			<AlbumArtistInfo album_data={data} />
			<AlbumList album_list={data} />
			<StandardButton
				text={"전체 재생하기"}
				onClick={handleClickPlayAllTrackButton}
				className="mb-160 mt-20 w-full px-14 desktop:px-52"
			/>
		</>
	);
};

export default Albuminfo;

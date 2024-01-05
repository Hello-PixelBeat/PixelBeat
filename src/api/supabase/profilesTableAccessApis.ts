import { NowPlayList, Track } from "@/types/recommendTypes";
import supabase from "./client";

interface OwnTracklistProps {
	prevOwnTracklist: string[];
	billId: string | undefined;
	userId: string | undefined;
}

//내 빌지 업데이트
export const updateOwnTracklist = async ({
	prevOwnTracklist,
	billId,
	userId,
}: OwnTracklistProps) => {
	const isAlreadyOwned = prevOwnTracklist.includes(billId!);
	try {
		const { data } = await supabase
			.from("profiles")
			.update({
				own_tracklist: isAlreadyOwned
					? prevOwnTracklist.filter((tracklist) => tracklist !== billId)
					: [...prevOwnTracklist, billId],
			})
			.eq("id", userId)
			.select();
		return data;
	} catch (error) {
		console.error("updateOwnPlaylist 중 오류 발생:", error);
		throw error;
	}
};

//----재생목록 관련-------

export interface NowPlayTracksProps {
	prevNowPlayTracklist: NowPlayList;
	tracks: any[];
	userId: string;
}

export interface NowPlayTrackProps {
	prevNowPlayTracklist: NowPlayList;
	track: Track;
	userId: string;
}

// 현재재생목록에 추가 및 지금 재생
export const addCurrentTrackTable = async ({
	prevNowPlayTracklist,
	track,
	userId,
}: NowPlayTrackProps): Promise<any> => {
	try {
		const { data } = await supabase
			.from("profiles")
			.update({
				nowplay_tracklist: {
					...prevNowPlayTracklist,
					tracks: [
						track,
						...prevNowPlayTracklist.tracks.filter(
							(item) => item.id !== track!.id,
						),
					],
					currentTrack: track,
					playingPosition: 0,
				},
			})
			.eq("id", userId)
			.select();

		return data![0];
	} catch (error) {
		console.error("addCurrentTrackTable 중 오류 발생:", error);
		throw error;
	}
};

//전체재생 (재생목록 추가 및 첫트랙 재생)
export const addNowPlayTracklistAndPlaySongTable = async ({
	prevNowPlayTracklist,
	tracks,
	userId,
}: NowPlayTracksProps): Promise<any> => {
	try {
		const { data } = await supabase
			.from("profiles")
			.update({
				nowplay_tracklist: {
					...prevNowPlayTracklist,
					tracks: [
						...tracks,
						...prevNowPlayTracklist.tracks.filter(
							(item) => tracks.findIndex((t) => t.id === item.id) === -1,
						),
					],
					currentTrack: tracks[0],
					playingPosition: 0,
				},
			})
			.eq("id", userId)
			.select("*");

		console.log(data![0].nowplay_tracklist.tracks);

		return data![0];
	} catch (error) {
		console.error("addNowPlayTracklist 중 오류 발생:", error);
		throw error;
	}
};

// 재생목록 변경 및 플레이포지션 변경
interface setCurrentTrackAndPositionTableProps {
	prevNowPlayTracklist: NowPlayList;
	track: any;
	playingPosition: number | string;
	userId: string;
}
export const setCurrentTrackAndPositionTable = async ({
	prevNowPlayTracklist,
	track,
	playingPosition,
	userId,
}: setCurrentTrackAndPositionTableProps): Promise<any> => {
	try {
		const { data } = await supabase
			.from("profiles")
			.update({
				nowplay_tracklist: {
					...prevNowPlayTracklist,
					currentTrack: track,
					playingPosition,
				},
			})
			.eq("id", userId)
			.select();

		return data![0];
	} catch (error) {
		console.error("setCurrentTrackTable 중 오류 발생:", error);
		throw error;
	}
};

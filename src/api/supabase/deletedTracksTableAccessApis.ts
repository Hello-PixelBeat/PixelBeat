import { DeletedTrack } from "@/types/deletedtracklistTypes";
import supabase from "./client";

// 모든 유저의 좋아요, 저장된 트랙리스트에 삭제된 빌지가 있으면 없애기
export interface DeleteTracklistProps {
	prevTracklist: string[];
	type: string;
	userId: string;
}

export const deleteTracklistInComparesTracklist = async ({
	prevTracklist,
	type,
	userId,
}: DeleteTracklistProps) => {
	try {
		const promises = prevTracklist
			.filter((item) => item.length === 36)
			.map(async (tracksId: string) => {
				const { data }: { data: DeletedTrack[] | null } = await supabase
					.from("deleted_tracks")
					.select("*")
					.eq("id", tracksId);
				if (!data?.length) return null;
				return data[0].id;
			});
		const filteredData = (await Promise.all(promises)).filter(
			(item) => item !== null,
		);

		if (!filteredData.length) return null;

		const updateData = prevTracklist.filter(
			(item) => !filteredData.includes(item),
		);

		const { data } = await supabase
			.from("profiles")
			.update(
				type === "liked"
					? { liked_tracklist: updateData }
					: { saved_tracklist: updateData },
			)
			.eq("id", userId)
			.select();

		return data![0];
	} catch (error) {
		console.error("Error in getArtistId:", error);
		throw error;
	}
};

export const addDeletedTracklist = async ({ billId }: { billId: string }) => {
	try {
		const { data } = await supabase
			.from("deleted_tracks")
			.insert([{ id: billId }])
			.select();

		return data;
	} catch (error) {
		console.log(error);
	}
};

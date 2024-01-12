import { Track, TrackList } from "@/types/recommendTypes";
import supabase from "./client";

interface UploadBillInterface {
	tracklist: Track[];
	analysis: Object;
	owner: Object | null;
	color: string;
	name: string | null;
}

interface UpdateBillInterface {
	billId: string | null;
	ownerInfo: Object | null;
	color: string;
	name: string | null;
}

export const getArtistId = async (genres: string[]) => {
	try {
		const { data } = await supabase
			.from("genre_artist_id_table")
			.select("*")
			.in("genre", genres);
		return data;
	} catch (error) {
		console.error("Error in getArtistId:", error);
		throw error;
	}
};

export const uploadBill = async ({
	tracklist,
	analysis,
	owner,
	color,
	name,
}: UploadBillInterface) => {
	try {
		const { data } = await supabase
			.from("tracks_table")
			.insert([
				{
					tracks: tracklist,
					analysis,
					owner,
					color,
					name,
				},
			])
			.select();
		return data![0].id;
	} catch (error) {
		console.error("Error in uploadBill:", error);
		throw error;
	}
};

export const getBillFromSupabase = async (
	billId: string | undefined,
): Promise<any> => {
	try {
		const { data } = await supabase
			.from("tracks_table")
			.select("*")
			.eq("id", billId);
		return data![0];
	} catch (error) {
		console.error("Error in getBill:", error);
		return error;
	}
};

export const updateBill = async ({
	billId,
	ownerInfo,
	color,
	name,
}: UpdateBillInterface) => {
	try {
		const { data } = await supabase
			.from("tracks_table")
			.update({ owner: ownerInfo, color, name })
			.eq("id", billId)
			.select();
		return data;
	} catch (error) {
		console.error("빌지 업데이트 중 오류 발생:", error);
		throw error;
	}
};

export interface LikeCountProps {
  billId: string
  prevLikes: number
  isAdd: boolean
}
export const updateBillLikes = async ({
  billId,
  prevLikes,
  isAdd
}: LikeCountProps) => {
  try {
    const { data } = await supabase
      .from('tracks_table')
      .update({ likes: isAdd ? prevLikes + 1 : prevLikes - 1 })
      .eq('id', billId)
      .select()
    return data as any[]
  } catch (error) {
    console.error('빌지 업데이트 중 오류 발생:', error)
    throw error
  }
}

export const deleteBill = async (billId: string) => {
	try {
		const { error } = await supabase
			.from("tracks_table")
			.delete()
			.eq("id", billId);
		return error;
	} catch (error) {
		console.error("빌지 업데이트 중 오류 발생:", error);
		throw error;
	}
};

export const getPopularBill = async (): Promise<TrackList[]> => {
	try {
		const { data } = await supabase
			.from("tracks_table")
			.select("*")
			.not("owner", "is", null);

		return data!.sort((a, b) => b.likes - a.likes).slice(0, 5);
	} catch (error) {
		console.error("Error in getBill:", error);
		throw error;
	}
};

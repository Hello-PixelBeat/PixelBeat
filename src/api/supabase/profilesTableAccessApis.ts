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

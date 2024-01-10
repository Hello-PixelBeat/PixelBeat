import supabase from "./client";

const IMAGE_PATH = import.meta.env.VITE_SUPABASE_STORAGE_URL;

/** Supabase - Storage에 이미지 업로드하는 함수 */
export const uploadImageToStorage = async (imageFile: File, userId: string) => {
	try {
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from("user_profile_img")
			.upload(`${userId}`, imageFile, {
				cacheControl: "3600",
				contentType: "image/*",
				upsert: true,
			});
		if (uploadError) {
			console.error(uploadError);
		}

		return IMAGE_PATH + uploadData?.path + `?timestamp=${new Date().getTime()}`;
	} catch (error) {
		console.error("이미지 업로드 중 오류 발생:", error);
		throw error;
	}
};

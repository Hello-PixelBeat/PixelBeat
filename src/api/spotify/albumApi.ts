import { baseInstance } from "../axios";

const getAlbum = async (album_id: string) => {
	try {
		const response = await baseInstance(`albums/${album_id}/?market=KR`);
		const data = response.data;
		return data;
	} catch (error) {
		console.error(error);
	}
};
export default getAlbum;

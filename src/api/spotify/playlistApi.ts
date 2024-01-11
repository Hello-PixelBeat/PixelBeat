import { baseInstance } from "../axios";

const getPlaylistFromSpotify = async (playlist_id: string) => {
	try {
		const response = await baseInstance(`playlists/${playlist_id}`);
		const data = response.data;
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
};
export default getPlaylistFromSpotify;

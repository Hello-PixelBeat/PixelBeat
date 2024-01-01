import { tokenInstance } from "./axios";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const requestData = {
	grant_type: "client_credentials",
	client_id: SPOTIFY_CLIENT_ID,
	client_secret: SPOTIFY_CLIENT_SECRET,
};

export const getNoneMemberToken = async () => {
	try {
		const response = await tokenInstance.post(
			"token",
			new URLSearchParams(requestData),
		);
		const data = await response.data;
		return data.access_token;
	} catch (error: any) {
		console.error(error);
	}
};

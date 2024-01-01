import { baseInstance } from "../axios";

interface recommendationsProps {
	artists: string[] | undefined;
	genre: string[] | undefined;
	tracks: string | undefined;
}

export const getRecommendations = async ({
	artists,
	genre,
	tracks,
}: recommendationsProps) => {
	try {
		const response = await baseInstance(
			`/recommendations?limit=8&market=KR&seed_artists=${artists}&seed_genres=${genre}&seed_tracks=${tracks}`,
		);
		const data = response.data;
		const { tracks: responseTrack } = data;
		return responseTrack;
	} catch (error) {
		console.error(error);
	}
};

export const getTracksAudioFeatures = async (tracksId: string[]) => {
	try {
		const response = await baseInstance(`audio-features?ids=${tracksId}`);
		const { audio_features } = response.data;
		return audio_features;
	} catch (error) {
		console.error(error);
	}
};

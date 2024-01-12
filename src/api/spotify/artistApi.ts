import { baseInstance } from "../axios";

/** SPOTIFY DOCS: Get Several Artists 참조 */
export const getArtistInfo = async (artist_id: any) => {
	try {
		const response = await baseInstance(`artists?ids=${artist_id}`);
		const data = response.data;
		const { artists } = data;
		return artists;
	} catch (error) {
		console.error(error);
	}
};

/** SPOTIFY DOCS: Get Artist's Top Tracks 참조
 *  아티스트 id로 top track 가져오는 API 단, id는 단수 
 * */
export const getArtistTopTracks = async (artist_id: any) => {
	try {
		const response = await baseInstance(
			`artists/${artist_id}/top-tracks?market=KR`,
		);
		const data = response.data;
		const { tracks } = data;
		return tracks;
	} catch (error) {
		console.error(error);
	}
};


export const getArtistAlbums = async (artist_id: string) => {
  try {
    const response = await baseInstance(`artists/${artist_id}/albums?market=KR`)
    const data = response.data
    const albumList = data.items
    return { albumList }
  } catch (error) {
    console.error(error)
    return error
  }
}

export const getRelatedArtists = async (artist_id: string) => {
  try {
    const response = await baseInstance(`artists/${artist_id}/related-artists`)
    const data = response.data
    const artists = data.artists
    return { artists }
  } catch (error) {
    console.error(error)
    return error
  }
}

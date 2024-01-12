const getAllTracksDuration = ({
	tracks,
	isPlaylist = false,
}: {
	tracks: any;
	isPlaylist?: boolean;
}) => {
	const allTracksDuration = tracks.reduce(
		(acc: number, currentItem: any) =>
			isPlaylist
				? acc + currentItem.track.duration_ms
				: acc + currentItem.duration_ms,
		0,
	);
	return allTracksDuration;
};

export default getAllTracksDuration;

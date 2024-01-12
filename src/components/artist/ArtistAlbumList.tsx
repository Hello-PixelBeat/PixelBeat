import useSwipe from "@/hooks/useSwipe";
import CommonAlbumItem from "../common/CommonAlbumItem";

const ArtistAlbumList = ({ artist_albums }: any) => {
	const {
		isDrag,
		scrollRef,
		onDragStart: handleDragStart,
		onDragMove: handleDragMove,
		onDragEnd: handleDragEnd,
	} = useSwipe();

	return (
		<div className="mt-27 px-20 desktop:px-60">
			<ul
				ref={scrollRef}
				onMouseDown={handleDragStart}
				onMouseMove={handleDragMove}
				onMouseUp={handleDragEnd}
				onMouseLeave={handleDragEnd}
				className="relative flex gap-8 overflow-x-auto overflow-y-hidden desktop:gap-16"
			>
				{artist_albums?.albumList &&
					artist_albums?.albumList.map((album: any) => (
						<CommonAlbumItem data={album} key={album.id} isDrag={isDrag} />
					))}
			</ul>
		</div>
	);
};

export default ArtistAlbumList;

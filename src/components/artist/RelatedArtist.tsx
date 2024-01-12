import useSwipe from "@/hooks/useSwipe";
import MenuIcon from "../svgComponents/MenuIcon";
import CommonArtistItem from "../common/CommonArtistItem";

const RelatedArtist = ({ artist_relatedArtistracks, propsClass }: any) => {
	const {
		isDrag,
		scrollRef,
		onDragStart: handleDragStart,
		onDragMove: handleDragMove,
		onDragEnd: handleDragEnd,
	} = useSwipe();

	return (
		<div className={`relative mt-27 px-20 desktop:px-60  ${propsClass}`}>
			<MenuIcon />
			<h1 className="absolute left-60 top-4 text-mainBlack desktop:left-130 desktop:top-5">
				관련 가수
			</h1>

			<div className="relative px-1 desktop:px-3">
				<ul
					ref={scrollRef}
					onMouseDown={handleDragStart}
					onMouseMove={handleDragMove}
					onMouseUp={handleDragEnd}
					onMouseLeave={handleDragEnd}
					className="flex overflow-x-auto"
				>
					{artist_relatedArtistracks &&
						artist_relatedArtistracks.artists.map((item: any) => (
							<CommonArtistItem data={item} key={item.id} isDrag={isDrag} />
						))}
				</ul>
			</div>
		</div>
	);
};
export default RelatedArtist;

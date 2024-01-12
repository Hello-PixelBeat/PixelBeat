import useSwipe from "@/hooks/useSwipe";
import MenuIcon from "../svgComponents/MenuIcon";
import CommonArtistItem from "../common/CommonArtistItem";

const SearchResultArtist = ({ artists }: any) => {
	const {
		isDrag,
		scrollRef,
		onDragStart: handleDragStart,
		onDragMove: handleDragMove,
		onDragEnd: handleDragEnd,
	} = useSwipe();

	if (!artists || artists.items.length === 0) {
		return (
			<div className="relative mt-22">
				<MenuIcon />
				<h2
					className="absolute left-40 top-4 
                    text-mainBlack 
                    desktop:left-80 desktop:top-5"
				>
					가수
				</h2>
				<p>No Item</p>
			</div>
		);
	}

	return (
		<>
			<MenuIcon />
			<h2
				className="absolute left-40 top-4 
                    text-mainBlack 
                    desktop:left-80 desktop:top-5"
			>
				가수
			</h2>
			<ul
				className="relative flex overflow-x-auto px-1 desktop:px-3"
				ref={scrollRef}
				onMouseDown={handleDragStart}
				onMouseMove={handleDragMove}
				onMouseUp={handleDragEnd}
				onMouseLeave={handleDragEnd}
			>
				{artists &&
					artists.items.map((item: any) => (
						<CommonArtistItem data={item} key={item.id} isDrag={isDrag} />
					))}
			</ul>
		</>
	);
};
export default SearchResultArtist;

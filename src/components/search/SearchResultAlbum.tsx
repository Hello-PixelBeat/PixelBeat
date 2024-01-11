import useSwipe from "@/hooks/useSwipe";
import MenuIcon from "../svgComponents/MenuIcon";
import CommonAlbumItem from "../common/CommonAlbumItem";

const SearchResultAlbum = ({ albums }: any) => {
	const {
		isDrag,
		scrollRef,
		onDragStart: handleDragStart,
		onDragMove: handleDragMove,
		onDragEnd: handleDragEnd,
	} = useSwipe();

	if (!albums || albums.items.length === 0) {
		return (
			<div className="relative mt-22">
				<MenuIcon />
				<h2
					className="absolute left-40 top-4 
                    text-mainBlack 
                    desktop:left-80 desktop:top-5"
				>
					앨범
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
				앨범
			</h2>
			<ul
				className="relative mt-8 flex gap-8 overflow-x-auto overflow-y-hidden desktop:gap-16"
				ref={scrollRef}
				onMouseDown={handleDragStart}
				onMouseMove={handleDragMove}
				onMouseUp={handleDragEnd}
				onMouseLeave={handleDragEnd}
			>
				{albums &&
					albums.items.map((item: any) => (
						<CommonAlbumItem data={item} key={item.id} isDrag={isDrag} />
					))}
			</ul>
		</>
	);
};

export default SearchResultAlbum;

import useSwipe from "@/hooks/useSwipe";
import { useQuery } from "@tanstack/react-query";
import { PopularUserBill } from "./PopularUserBill";
import { getPopularBill } from "@/api/supabase/playlistTableAccessApis";
import { TrackList } from "@/types/recommendTypes";
import MenuIcon from "../svgComponents/MenuIcon";

const PopularUserList = () => {
	const {
		isDrag,
		scrollRef,
		onDragStart: handleDragStart,
		onDragMove: handleDragMove,
		onDragEnd: handleDragEnd,
	} = useSwipe();

	const { data, isLoading } = useQuery<TrackList[]>({
		queryKey: ["relatedBill"],
		queryFn: getPopularBill,
	});

	if (isLoading) return null;

	return (
		<div className="relative mt-53 px-20 desktop:px-60">
			<MenuIcon />
			<h1 className="absolute left-65 top-4 text-mainBlack desktop:left-130 desktop:top-5">
				인기 영수증
			</h1>
			<ul
				ref={scrollRef}
				onMouseDown={handleDragStart}
				onMouseMove={handleDragMove}
				onMouseUp={handleDragEnd}
				onMouseLeave={handleDragEnd}
				className="ml-1 mt-6 flex gap-x-4 overflow-x-auto"
			>
				{data?.map((item) => (
					<PopularUserBill data={item} isDrag={isDrag} key={item.id} />
				))}
			</ul>
		</div>
	);
};

export default PopularUserList;

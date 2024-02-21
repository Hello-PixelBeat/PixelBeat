import getPlaylistFromSpotify from "@/api/spotify/playlistApi";
import { getBillFromSupabase } from "@/api/supabase/playlistTableAccessApis";
import { Spinner } from "@/components";
import SPINNER_TEXT from "@/constants/spinnerText";
import { useModal } from "@/hooks/useModal";
import useUserInfo from "@/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowDown from "@/assets/svgs/ArrowDown.svg?react";
import MoreCircle from "@/assets/svgs/MoreCircle.svg?react";
import Portal from "@/utils/portal";
import BottomSheet from "@/components/common/BottomSheet";
import MusicDrawerItem from "@/components/mymusic/MusicDrawerItem";
import useMusicDrawerStore from "@/zustand/musicDrawerStore";

const MyMusicShelfDetail = () => {
	const { isLoading: isUserInfoLoading } = useUserInfo();
	const { id: billId } = useParams<string>();
	const isSpotify = !(billId!.length === 36);
	const navigate = useNavigate();
	const currentTrack = useMusicDrawerStore(
		(state) => state.currentTrack_MusicDrawer,
	);

	const [selectedTrack, setSelectedTrack] = useState<any>();
	const { modalType, closeModal } = useModal();

	const query = isSpotify
		? {
				//스포티파이 내 영수증
				queryKey: ["bill from spotify", billId],
				queryFn: () => getPlaylistFromSpotify(billId!),
			}
		: {
				//픽셀비트 내 영수증
				queryKey: ["bill from PixelBeat", billId],
				queryFn: () => getBillFromSupabase(billId!),
			};

	const { data, isLoading } = useQuery(query);

	const handelNavigatePlaynow = () => {
		navigate("/mymusic/playnow");
	};

	const handelNavigateShelf = () => {
		navigate("/mymusic/shelf");
	};

	const handleClickModelList = (e: React.MouseEvent<HTMLButtonElement>) => {
		switch (e.currentTarget.innerText) {
			case "가수 정보 보기":
				navigate(`/artistinfo/${selectedTrack.artists[0].id}`);
				break;
			case "앨범 정보 보기":
				navigate(`/albuminfo1/${selectedTrack.album.id}`);
				break;
			default:
				return;
		}
		closeModal();
	};

	if (isLoading || isUserInfoLoading)
		return <Spinner text={SPINNER_TEXT.BILL_TEXT} />;

	return (
		<div>
			<div className="flex flex-col px-20 desktop:px-60">
				<section className="mt-30 flex justify-between text-20">
					<div>
						<button className="musicList w-113" onClick={handelNavigatePlaynow}>
							재생목록
						</button>
						<button
							className="musicListGreen w-113 text-mainBlack"
							onClick={handelNavigateShelf}
						>
							음악서랍
						</button>
					</div>
					<button onClick={() => navigate(-1)} className="h-24 w-24 ">
						<ArrowDown />
					</button>
				</section>
				
        <ul className="mx-auto mb-140 min-h-[80svh] w-full border">
					<li className="group relative flex h-62 w-full cursor-pointer items-center justify-between border-b-1 pl-12 pr-16 hover:bg-mainGray300">
						<p className="truncate text-16 desktop:text-18 ">
							{data.name} (
							{isSpotify
								? data.tracks.items.filter(
										(item: any) => item.track.preview_url,
									).length
								: data.tracks.filter((item: any) => item.preview_url).length}
							)
						</p>
						<button type="button" onClick={handelNavigateShelf}>
							<MoreCircle />
						</button>
					</li>
					{isSpotify
						? data.tracks.items
								.filter((item: any) => item.track.preview_url)
								.map((item: any, idx: any) => (
									<MusicDrawerItem
										track={item.track}
										key={item.track.id + idx}
										setSelectedTrack={setSelectedTrack}
										isSelected={item.track.id === currentTrack?.id}
									/>
								))
						: data.tracks
								.filter((item: any) => item.preview_url)
								.map((item: any, idx: any) => (
									<MusicDrawerItem
										track={item}
										key={item.id + idx}
										setSelectedTrack={setSelectedTrack}
										isSelected={item.id === currentTrack?.id}
									/>
								))}
				</ul>
			</div>
			<Portal>
				{modalType === "MUSIC_DRAWER_MORE" && (
					<BottomSheet onClick={handleClickModelList} />
				)}
			</Portal>
		</div>
	);
};

export default MyMusicShelfDetail;

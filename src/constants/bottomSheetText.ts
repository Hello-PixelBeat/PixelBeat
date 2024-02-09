export interface BottomSheetTypes {
	TRACK_MORE: string[];
	MY_NOW_PLAY_TRACK_MORE: string[];
	MUSIC_DRAWER_MORE: string[];
	PLAYLIST_MORE: string[];
	MYPROFILE_MORE: string[];
	MYBILL_MORE: string[];
	MY_MUSIC_SHELF_DELETE: string[];
}
[];

const BOTTOMSHEET_TYPE: Readonly<BottomSheetTypes> = Object.freeze({
	TRACK_MORE: ["재생목록에 추가하기"],
	MY_NOW_PLAY_TRACK_MORE: ["삭제하기", "가수 정보 보기", "앨범 정보 보기"],
	MUSIC_DRAWER_MORE: ["가수 정보 보기", "앨범 정보 보기"],
	PLAYLIST_MORE: ["음악서랍에 저장하기"],
	MYPROFILE_MORE: ["프로필 수정하기", "로그아웃"],
	MYBILL_MORE: ["삭제하기"],
	MY_MUSIC_SHELF_DELETE: ["삭제하기"],
});

export default BOTTOMSHEET_TYPE;

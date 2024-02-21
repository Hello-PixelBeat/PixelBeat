export interface ConfirmType {
	DELETE: string[];
	EDIT: string[];
	EDIT_COMPLETE: string[];
	ALREADY_USERNAME: string[];
	ADD_OWN_PLAYLIST: string[];
	LOGOUT: string[];
	LOGIN_GUIDE: string[];
	SAVE_COMPLETE: string[];
	ALREADY_OWN_PLAYLIST: string[];
	LOGIN_FAIL: string[];
	SHARE_URL_COPY: string[];
	CONFIRM: string[];
	CANCEL: string[];
	MUSIC_SHELF_SAVE: string[];
}
[];

const CONFIRM_TYPE: Readonly<ConfirmType> = Object.freeze({
	DELETE: ["삭제하시겠습니까?", "삭제"],
	EDIT: ["수정하시겠습니까?", "수정"],
	EDIT_COMPLETE: ["수정이 완료되었습니다."],
	ALREADY_USERNAME: ["이미 존재하는 유저명입니다."],
	ADD_OWN_PLAYLIST: [
		`음악서랍에
      저장하시겠습니까?`,
		"저장",
	],
	LOGOUT: ["로그아웃하시겠습니까?", "확인"],
	LOGIN_GUIDE: [
		`로그인이 필요한 서비스입니다.
      로그인 하시겠습니까?`,
		"확인",
	],
	SAVE_COMPLETE: ["저장이 완료되었습니다."],
	ALREADY_OWN_PLAYLIST: ["이미 저장된 영수증입니다."],
	LOGIN_FAIL: [
		`로그인에 실패했습니다.
      다시 한번 확인해주세요.`,
	],
	SHARE_URL_COPY: ["링크가 클립보드에 복사되었습니다."],
	CONFIRM: ["확인"],
	CANCEL: ["취소"],
	MUSIC_SHELF_SAVE: ["음악서랍에 저장되었습니다."],
});

export default CONFIRM_TYPE;

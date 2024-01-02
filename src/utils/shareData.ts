type SharedData = {
	url: string;
	text?: string;
	title?: string;
	files?: File[];
};

const shareData = async (data: SharedData, openConfirm?: any) => {
	if (!!navigator.canShare) {
		await navigator.share(data);
		return;
	}
	try {
		navigator.clipboard
			.writeText(data.url)
			.then(() => openConfirm("SHARE_URL_COPY"));
	} catch (error) {
		alert(error);
		console.error("복사에 실패하였습니다.", error);
	}
};

export default shareData;

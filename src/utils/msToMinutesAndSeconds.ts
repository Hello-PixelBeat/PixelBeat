const msToMinutesAndSeconds = (ms: number) => {
	const totalSeconds = Math.floor(ms / 1000);
	const calcMinutes = Math.floor(totalSeconds / 60);

	const calcSeconds = totalSeconds % 60;

	// 두 자리 수로 포맷팅
	const minutes = String(calcMinutes).padStart(2, "0");
	const seconds = String(calcSeconds).padStart(2, "0");

	// 결과 반환
	return { minutes, seconds };
};

export default msToMinutesAndSeconds;

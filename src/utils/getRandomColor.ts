const getRandomColor = () => {
	const colorArr = [
		"#FF5757",
		"#5757FF",
		"#FF57FF",
		"#57FFFF",
		"#FFFF57",
		"#57FF57",
	];
	const randomIndex = Math.floor(Math.random() * colorArr.length);
	return colorArr[randomIndex];
};
export default getRandomColor;

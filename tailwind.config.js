/** @type {import('tailwindcss').Config} */
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_300 = { ...Array.from(Array(301)).map((_, i) => `${i}px`) };
const px0_500 = { ...Array.from(Array(501)).map((_, i) => `${i}px`) };
const px0_800 = { ...Array.from(Array(801)).map((_, i) => `${i}px`) };

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{html,js,ts,jsx,tsx}",
		"./components/**/*.{html,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderWidth: px0_10,
			fontSize: px0_100,
			lineHeight: px0_100,
			minWidth: px0_300,
			minHeight: px0_300,
			maxWidth: px0_800,
			spacing: px0_500,
			colors: {
				mainBlack: "#000",
				mainWhite: "#fff",
				mainRed: "#FF5757",
				mainBlue: "#5757FF",
				mainPink: "#FF57FF",
				mainCyan: "#57FFFF",
				mainYellow: "#FFFF57",
				mainGreen: "#57FF57",
				bgGray: "#E6E6E6",
				mainGray: "#C3C3C3",
				mainGray200: "#9C9C9C",
				mainGray300: "#313131",
				mainBlackOpacity: "#00000099",
			},
			screens: {
				mobile: "390px",
				desktop: "720px",
				middle: { minWidth: "390px", maxWidth: "720px" },
			},
		},
	},
	plugins: [],
};

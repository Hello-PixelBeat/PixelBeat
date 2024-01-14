import NavHome from "@/assets/svgs/NavHome.svg?react";
import NavSearch from "@/assets/svgs/NavSearch.svg?react";
import NavMyMusic from "@/assets/svgs/NavMyMusic.svg?react";
import NavProfile from "@/assets/svgs/NavProfile.svg?react";

export const NAV_BAR_TEXT = [
	{
		icon: NavHome,
		path: "/home",
	},
	{
		icon: NavSearch,
		path: "/search",
	},
	{
		icon: NavMyMusic,
		path: "/mymusic/playnow",
	},
	{
		icon: NavProfile,
		path: `/mypage/bills`,
	},
];

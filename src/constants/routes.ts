import { LazyRouteType } from "@/types/types";

export const ROUTES = [
	"Entry",
	"Recommend",
	"RecommendEntry",
	"Home",
	"MyPage",
	"User",
	"AlbumInfo",
	"ArtistInfo",
	"MyMusic",
	"MusicShelfDetail",
	"Search",
	"Login",
	"Signup",
	"Page-UserBill",
	"Page-GuestBill",
];

export const ROUTE_CONFIG: {
	[key: string]: LazyRouteType;
} = {
	RecommendEntry: { index: true, path: "/" },
	Recommend: { path: "recommend/:id" },
	MyPage: { path: "mypage", authentication: true },
};

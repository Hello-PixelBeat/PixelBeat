import { LazyRouteType } from "@/types/types";

export const ROUTES = [
	"Entry",
	"Recommend",
	"RecommendEntry",
	"ProfileUpload",
	"ProfileEdit",
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
	"SignupGreeting",
	"UserBill",
	"GuestBill",
];

export const ROUTE_CONFIG: {
	[key: string]: LazyRouteType;
} = {
	RecommendEntry: { index: true, path: "/" },
	Recommend: { path: "recommend/:id" },
	MyPage: { path: "mypage", authentication: true },
	MyMusic: { path: "mymusic", authentication: true },
	ProfileEdit: { path: "profileedit", authentication: true },
	ProfileUpload: { path: "profileupload", authentication: true },
	GuestBill: { path: "guestbill/:id" },
  AlbumInfo: {path: 'albuminfo/:id'}
};

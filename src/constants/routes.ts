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
	"MyMusicShelfDetail",
	"Search",
	"Login",
	"Signup",
	"SignupGreeting",
	"UserBill",
	"GuestBill",
	"SpotifyBill",
];

export const ROUTE_CONFIG: {
	[key: string]: LazyRouteType;
} = {
	RecommendEntry: { index: true, path: "/" },
	Recommend: { path: "recommend/:id" },
	MyPage: { path: "mypage/:id", authentication: true },
	User: { path: "user/:userid/:page" },
	MyMusic: { path: "mymusic/:id", authentication: true },
	MyMusicShelfDetail: { path: "mymusic/shelf/:id" },
	ProfileEdit: { path: "profileedit", authentication: true },
	ProfileUpload: { path: "profileupload", authentication: true },
	AlbumInfo: { path: "albuminfo/:id" },
	ArtistInfo: { path: "artistinfo/:id" },
	GuestBill: { path: "guestbill/:id" },
	UserBill: { path: "userbill/:id/:userid" },
	SpotifyBill: { path: "SpotifyBill/:trackid" },
};

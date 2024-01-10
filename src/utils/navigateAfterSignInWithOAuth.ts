import { getProfile } from "@/api/supabase/profilesTableAccessApis";
import getUserIdFromSession from "./getUserIdFromSession";
import { redirect } from "react-router-dom";

const navigateAfterSignInWithOAuth = async () => {
	const userInfoFromDatabase = localStorage.getItem("userInfoFromDatabase");
	const username = JSON.parse(userInfoFromDatabase!).state.userInfo.username;
	if (username) return null;

	const userId = await getUserIdFromSession();
	if (!userId) return null;

	const profile = await getProfile(userId);
	if (profile && profile.id && !profile.username) {
		return redirect("/profileupload");
	}
	return null;
};
export default navigateAfterSignInWithOAuth;

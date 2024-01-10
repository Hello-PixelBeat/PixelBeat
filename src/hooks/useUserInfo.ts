import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import useUserSession from "@/hooks/useUserSession";
import { getProfile } from "@/api/supabase/profilesTableAccessApis";

//직접 db에 접근해서 스토리지에 저장
const useUserInfo = () => {
	const userId = useUserSession();
	const setUserInfo = useUserStore((state) => state.setUserInfo);
	const setNowPlayStore = usePlayNowStore((state) => state.setNowPlayStore);

	const {
		data: userInfo,
		error,
		isLoading: isQueryLoading,
	} = useQuery({
		queryKey: ["profiles from supabase", userId],
		queryFn: async () => {
			const profile = await getProfile(userId);
			setUserInfo(profile);
			setNowPlayStore(profile.nowplay_tracklist);
			return profile;
		},
		enabled: !!userId,
	});

	const isLoading = !userId && isQueryLoading;

	return { userInfo, error, isLoading };
};
export default useUserInfo;

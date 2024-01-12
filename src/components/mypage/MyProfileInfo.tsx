import Profile from "@/assets/images/Profile.png";
import useUserStore from "@/zustand/userStore";
const MyProfileInfo = () => {
	const userInfo = useUserStore((state) => state.userInfo);

	return (
		<div
			className="flex h-119 w-full items-center bg-mainGreen 
                  px-20 
                  desktop:px-60"
		>
			<img
				className="ml-10 h-90 w-90"
				src={userInfo.avatar_url ? userInfo.avatar_url : Profile}
				alt={userInfo.username || "profile image"}
			/>
			<div className="ml-16 text-mainBlack">
				<p className="text-20">{userInfo.username}</p>
				<p className="text-16">
					{userInfo.introduce || "작성된 자기소개가 없습니다."}
				</p>
			</div>
		</div>
	);
};
export default MyProfileInfo;

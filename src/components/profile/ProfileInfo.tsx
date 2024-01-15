import Profile from "@/assets/images/Profile.png";
import { User } from "@/types/user";

const ProfileInfo = ({ userinfo }: { userinfo?: User }) => {
	return (
		<div
			className="flex h-119 w-full items-center bg-mainGreen 
                  px-20 
                  desktop:px-60"
		>
			<img
				className="ml-10 h-90 w-90"
				src={userinfo?.avatar_url ? userinfo?.avatar_url : Profile}
				alt={userinfo?.username || "profile image"}
			/>
			<div className="ml-16 text-mainBlack">
				<p className="text-20">{userinfo?.username}</p>
				<p className="text-16">
					{userinfo?.introduce || "작성된 자기소개가 없습니다."}
				</p>
			</div>
		</div>
	);
};
export default ProfileInfo;

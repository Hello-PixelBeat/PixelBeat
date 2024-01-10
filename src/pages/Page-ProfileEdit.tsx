import ProfileForm from "@/components/profile/ProfileForm";

const ProfileEdit = () => {
	return (
		<div className="px-20 desktop:px-60">
			<h1 className="pt-52 text-center text-24 font-normal">프로필 설정</h1>
			<ProfileForm />
		</div>
	);
};

export default ProfileEdit;

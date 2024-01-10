import ProfileForm from "@/components/profile/ProfileForm";

const ProfileUpload = () => {
	return (
		<div className="px-20 desktop:px-60">
			<h1 className="pt-52 text-center text-24 font-normal">프로필 설정</h1>
			<h2 className="my-14 text-center text-14 font-normal not-italic">
				나중에 언제든지 변경할 수 있습니다.
			</h2>
			<ProfileForm />
		</div>
	);
};

export default ProfileUpload;

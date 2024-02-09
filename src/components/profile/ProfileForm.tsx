import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StandardButton } from "@/components";
import {
	updateOwnTracklist,
	updateProfile,
} from "@/api/supabase/profilesTableAccessApis";
import { uploadImageToStorage } from "@/api/supabase/imageStorageAccessApis";
import { updateBill } from "@/api/supabase/playlistTableAccessApis";
import useConfirm from "@/hooks/useConfirm";
import useUserSession from "@/hooks/useUserSession";
import useRecommendResultStore from "@/zustand/recommendResultStore";
import getRandomColor from "@/utils/getRandomColor";
import { UserMin } from "@/types/user";
import ProfileInputField from "./ProfileInputField";
import ImageUploadForm from "./ImageUploadForm";
import useUserStore from "@/zustand/userStore";
import useUpdateProfileMutation from "@/hooks/useUpdateUserInfoMutation";

const ProfileForm = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const userId = useUserSession();
	const userInfo = useUserStore((state) => state.userInfo);
	const resultBillId = useRecommendResultStore((state) => state.resultBillId);
	const resetRecommendResultStore = useRecommendResultStore(
		(state) => state.resetRecommendResultStore,
	);
	const { openConfirm } = useConfirm();
	//프로필 정보
	const [image, setImage] = useState<any>(null);
	const [formState, setFormState] = useState({
		userName: "",
		userIntroduction: "",
	});
	const [isInvalid, setIsInvalid] = useState(true);
	const { mutate: updateProfileMutate } =
		useUpdateProfileMutation(updateProfile);

	useEffect(() => {
		if (userInfo.username) {
			setFormState({
				userName: userInfo.username,
				userIntroduction: userInfo.introduce,
			});
			setImage(userInfo.avatar_url);
			setIsInvalid(false);
		}
	}, [userInfo]);

	const editProfile = async () => {
		try {
			let updatedImageUrl = userInfo.username ? userInfo.avatar_url : "";

			//이미지 변경 시 수정
			if (image && image !== userInfo.avatar_url) {
				updatedImageUrl = await uploadImageToStorage(image, userId);
			}

			updateProfileMutate(
				{
					username: formState.userName.trim(),
					introduce: formState.userIntroduction.trim(),
					imageUrl: updatedImageUrl,
					userId,
				},
				{
					onSuccess: async () => {
						// zustand에 bill있으면 owner추가
						if (resultBillId) {
							const minOwnerInfo: UserMin = {
								userId,
								username: formState.userName.trim(),
							};
							await updateBill({
								billId: resultBillId,
								ownerInfo: minOwnerInfo,
								color: getRandomColor(),
								name: `${minOwnerInfo.username}의 음악영수증 #1`,
							});
							await updateOwnTracklist({
								prevOwnTracklist: [],
								billId: resultBillId,
								userId,
							});
							resetRecommendResultStore();
						}
						const navigateUrl =
							pathname === "/profileupload" ? "/home" : "/mypage/bills";
						navigate(navigateUrl);
					},
				},
			);
		} catch (error: any) {
			if (error.toString().includes("duplicate")) {
				openConfirm("ALREADY_USERNAME");
			}
			console.error("프로필 업데이트 중 오류 발생:", error);
		}
	};

	//텍스트 변경감지
	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
		setIsInvalid(name === "userName" && value === "");
	};

	return (
		<>
			<form
				className="mt-24 flex flex-col items-center justify-center gap-20 desktop:gap-30"
				onSubmit={(e) => e.preventDefault()}
			>
				<ImageUploadForm setImage={setImage} image={image} />

				<ProfileInputField
					name={"userName"}
					label="닉네임"
					value={formState.userName}
					placeholder="픽셀비트"
					onChange={handleTextChange}
				/>
				<ProfileInputField
					name={"userIntroduction"}
					label="자기소개"
					value={formState.userIntroduction}
					placeholder="자기소개를 적어주세요"
					onChange={handleTextChange}
				/>

				<StandardButton
					onClick={editProfile}
					type="submit"
					className="mx-auto mt-22 h-56
                    w-full
                    desktop:h-60 "
					text={"완료"}
					disabled={isInvalid}
					fillColor={isInvalid ? "" : "#57FF57"}
				/>
			</form>
		</>
	);
};

export default ProfileForm;

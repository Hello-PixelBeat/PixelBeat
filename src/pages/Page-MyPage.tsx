import { signOutUser } from "@/api/supabase/authApis";
import BottomSheet from "@/components/common/BottomSheet";
import ConfirmModal from "@/components/common/ConfirmModal";
import Header from "@/components/common/Header";
import ProfileBillList from "@/components/profile/ProfileBillList";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileLikeBillList from "@/components/profile/ProfileLikeBillList";
import useConfirm from "@/hooks/useConfirm";
import { useModal } from "@/hooks/useModal";
import Portal from "@/utils/portal";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useNavigate, useParams } from "react-router-dom";

const MyPage = () => {
	const resetUserInfo = useUserStore((state) => state.resetUserInfo);
	const resetNowPlayStore = usePlayNowStore((state) => state.reset);
	const userInfo = useUserStore((state) => state.userInfo);
	const { openModal } = useModal();
	const navigate = useNavigate();
	const { openConfirm, closeConfirm, isShow } = useConfirm();
	const { id } = useParams();

	const renderContents = (id: string) => {
		return {
			bills: <ProfileBillList userInfo={userInfo} />,
			likebills: <ProfileLikeBillList userInfo={userInfo} />,
		}[id];
	};

	const handleBottomSheet = () => {
		openModal("MYPROFILE_MORE");
	};

	const moveToHome = () => {
		navigate("/home");
	};

	const handleBottomSheetContentClick = async (e: any) => {
		const { innerText: contents } = e.target;

		if (contents === "프로필 수정하기") {
			navigate("/profileedit");
		}

		if (contents === "로그아웃") {
			openConfirm("LOGOUT");
		}
	};

	const handleLogout = async () => {
		try {
			await signOutUser();
			resetUserInfo();
			resetNowPlayStore();
			navigate("/home");
		} catch (error) {
			console.error("로그아웃 에러:", error);
		}
	};

	return (
		<div>
			<Header
				type="MYPAGE"
				onClickRightButton={handleBottomSheet}
				onClickLeftButton={moveToHome}
			/>
			<ProfileInfo userinfo={userInfo} />
			{renderContents(id as string)}

			<Portal>
				<BottomSheet onClick={handleBottomSheetContentClick} />
				{isShow && (
					<ConfirmModal
						onCancelClick={closeConfirm}
						onConfirmClick={handleLogout}
					/>
				)}
			</Portal>
		</div>
	);
};

export default MyPage;

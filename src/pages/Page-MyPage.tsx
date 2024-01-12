import { signOutUser } from "@/api/supabase/authApis";
import BottomSheet from "@/components/common/BottomSheet";
import ConfirmModal from "@/components/common/ConfirmModal";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";
import MyBillList from "@/components/mypage/MyBillList";
import { MyLikeBillList } from "@/components/mypage/MyLikeBillList";
import MyProfileInfo from "@/components/mypage/MyProfileInfo";
import useConfirm from "@/hooks/useConfirm";
import { useModal } from "@/hooks/useModal";
import Portal from "@/utils/portal";
import usePlayNowStore from "@/zustand/playNowStore";
import useUserStore from "@/zustand/userStore";
import { useNavigate, useParams } from "react-router-dom";

const MyPage = () => {
	const setUserInfo = useUserStore((state) => state.resetUserInfo);
	const setNowPlayStore = usePlayNowStore((state) => state.reset);
	const { openModal } = useModal();
	const navigate = useNavigate();
	const { openConfirm, closeConfirm, isShow } = useConfirm();
	const { id } = useParams();

	const renderContents = (id: string) => {
		return {
			mine: <MyBillList />,
			like: <MyLikeBillList />,
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
			setUserInfo();
			setNowPlayStore();
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
			<MyProfileInfo />
			{renderContents(id as string)}
			<NavBar />

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

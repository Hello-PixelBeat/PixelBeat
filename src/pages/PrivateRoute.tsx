import ConfirmModal from "@/components/common/ConfirmModal";
import useConfirm from "@/hooks/useConfirm";
import useUserInfo from "@/hooks/useUserInfo";
import Portal from "@/utils/portal";
import useUserStore from "@/zustand/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
	LazyComponent: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ LazyComponent }) => {
	const loggedInUser = useUserStore((state) => state.userInfo);

	const navigate = useNavigate();
	const { openConfirm, isShow, closeConfirm, confirmType } = useConfirm();
	useUserInfo();

	useEffect(() => {
		if (!loggedInUser.id) {
			openConfirm("LOGIN_GUIDE");
		}
	}, [isShow]);

	const handleNavigateHome = () => {
		closeConfirm();
		navigate("/home");
	};

	const handleNavigateEntry = () => {
		closeConfirm();
		navigate("/entry");
	};

	return (
		<>
			{isShow && confirmType !== "LOGOUT" ? (
				<Portal>
					<ConfirmModal
						onConfirmClick={handleNavigateEntry}
						onCancelClick={handleNavigateHome}
					/>
				</Portal>
			) : (
				<LazyComponent />
			)}
		</>
	);
};

export default PrivateRoute;

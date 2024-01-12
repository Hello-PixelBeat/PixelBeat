import ConfirmModal from "@/components/common/ConfirmModal";
import useConfirm from "@/hooks/useConfirm";
import Portal from "@/utils/portal";
import useUserStore from "@/zustand/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
	LazyComponent: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ LazyComponent }) => {
	const loggedInUser = useUserStore().userInfo;
	const navigate = useNavigate();
	const { openConfirm, isShow, closeConfirm } = useConfirm();

	useEffect(() => {
		if (!loggedInUser.username) {
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
			{isShow ? (
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

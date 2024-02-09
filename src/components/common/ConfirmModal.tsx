import CONFIRM_TYPE, { type ConfirmType } from "@/constants/confirmText";
import useConfirm from "@/hooks/useConfirm";
import { SmallButton } from "..";
import { useNavigate } from "react-router-dom";

const BUTTON_STYLE = `relative 
    desktop:w-120 desktop:h-40 desktop:text-16 
    text-14 w-80 h-24 
  `;

interface ConfirmModalProps {
	onConfirmClick?: () => void;
	onCancelClick?: () => void;
}

const ConfirmModal = ({ onConfirmClick, onCancelClick }: ConfirmModalProps) => {
	const { closeConfirm, confirmType } = useConfirm();
	const navigate = useNavigate();

	const handleConfirm = () => {
		if (confirmType === "LOGIN_GUIDE") {
			navigate("/entry");
		}

		if (onConfirmClick) {
			onConfirmClick();
		}

		closeConfirm();
	};

	const handleCancel = () => {
		if (onCancelClick) {
			onCancelClick();
		}

		closeConfirm();
	};

	return (
		<div
			className="portal-background left-2/1 translate-x-2/1 fixed top-0 flex h-[100svh] w-full items-center justify-center"
			onClick={closeConfirm}
		>
			<div className="flex items-center justify-center border-2 border-mainBlack bg-mainWhite p-4">
				<div className="relative flex flex-col items-center justify-center border-4 border-mainBlack px-48 py-32 desktop:h-220 desktop:w-440">
					<p
						className={`mb-16 text-center text-16 text-mainBlack desktop:mb-20 desktop:text-20 ${
							confirmType === "LOGIN_FAIL"
								? "max-w-190 desktop:max-w-220"
								: confirmType === "SHARE_URL_COPY"
									? "max-w-150 desktop:max-w-180"
									: "max-w-230 desktop:max-w-300"
						} `}
					>
						{CONFIRM_TYPE[confirmType as keyof ConfirmType][0]}
					</p>
					{CONFIRM_TYPE[confirmType as keyof ConfirmType][1] ? (
						<div className="inline-block">
							<SmallButton
								onClick={handleConfirm}
								propsClass={`${BUTTON_STYLE} mr-10`}
								text={CONFIRM_TYPE[confirmType as keyof ConfirmType][1]}
							/>
							<SmallButton
								onClick={handleCancel}
								propsClass={`${BUTTON_STYLE} `}
								fillColor="white"
								text={CONFIRM_TYPE.CANCEL[0]}
							/>
						</div>
					) : (
						<SmallButton
							onClick={closeConfirm}
							propsClass="relative w-80 text-14 desktop:w-120  desktop:text-18"
							text={CONFIRM_TYPE.CONFIRM[0]}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;

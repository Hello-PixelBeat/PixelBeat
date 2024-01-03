import { useConfirmStore } from "@/zustand/confirmStore";
import { useCallback } from "react";

const useConfirm = () => {
	const { isShow, setIsShow, confirmType, setConfirmType } = useConfirmStore();

	const openConfirm = useCallback(
		(confirmType?: string) => {
			setIsShow(true);
			if (confirmType) setConfirmType(confirmType);
		},
		[setConfirmType, setIsShow],
	);

	const closeConfirm = useCallback(() => {
		setIsShow(false);
		setConfirmType("");
	}, [setIsShow]);

	return {
		isShow,
		confirmType,
		openConfirm,
		closeConfirm,
	};
};

export default useConfirm;

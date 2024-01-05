import { useModalStore } from "@/zustand/modalStore";
import { useEffect, useState } from "react";
import { useCallback } from "react";

export const useModal = () => {
	const { isShow, setIsShow, modalType, setModalType } = useModalStore();
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const openModal = useCallback(
		(modalType?: string) => {
			setIsShow(true);
			if (modalType) setModalType(modalType);
		},
		[setModalType, setIsShow],
	);

	const closeModal = useCallback(() => {
		setIsShow(false);
	}, [setIsShow]);

	useEffect(() => {
		let modalTimer: any;

		if (isShow) {
			setIsVisible(true);
		} else {
			modalTimer = setTimeout(() => {
				setIsVisible(false);
				setModalType("");
			}, 250);
		} /** 애니메이션 효과를 위해서 0.25초뒤에 사라지도록 설정 */ 

		return () => {
			if (modalTimer !== undefined) {
				clearTimeout(modalTimer);
			}
		};
	}, [isShow]);

	return {
		isShow,
		isVisible,
		modalType,
		setModalType,
		openModal,
		closeModal,
	};
};

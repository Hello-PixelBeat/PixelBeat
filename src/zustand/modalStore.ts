import { create } from "zustand";

interface Modal {
	isShow: boolean;
	modalType?: string;
}

const initialStore: Modal = {
	modalType: "",
	isShow: false,
};

interface ModalStore extends Modal {
	setIsShow: (bool: boolean) => void;
	setModalType: (modalType: string) => void;
}

export const modalStore = (set: any) => ({
	...initialStore,
	//show값 지정
	setIsShow: (bool: boolean) =>
		set((state: Modal) => ({
			...state,
			isShow: bool,
		})),
	//modalType값 지정
	setModalType: (modalType: string) =>
		set((state: Modal) => ({
			...state,
			modalType: modalType,
		})),
});

export const useModalStore = create<ModalStore>(modalStore);

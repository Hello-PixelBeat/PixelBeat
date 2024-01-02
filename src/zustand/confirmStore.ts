import { create } from "zustand";

interface Confirm {
	isShow: boolean;
	confirmType?: string;
}

interface ConfirmStore extends Confirm {
	setIsShow: (bool: boolean) => void;
	setConfirmType: (confirmType: string) => void;
}

const initialStore: Confirm = {
	confirmType: "",
	isShow: false,
};

export const confirmStore = (set: any) => ({
	...initialStore,
	//show값 지정
	setIsShow: (bool: boolean) =>
		set((state: Confirm) => ({
			...state,
			isShow: bool,
		})),
	//confirmType값 지정
	setConfirmType: (confirmType: string) =>
		set((state: Confirm) => ({
			...state,
			confirmType,
		})),
});

export const useConfirmStore = create<ConfirmStore>(confirmStore);

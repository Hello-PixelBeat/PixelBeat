import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RecommendResultStoreType {
	resultBillId: string | null;
}

const initialStore: RecommendResultStoreType = {
	resultBillId: null,
};

type RecommendResultStore = RecommendResultStoreType & {
	setResultBillId: (resultBillId: string) => void;
	resetRecommendResultStore: () => void;
};

const useRecommendResultStore = create(
	persist<RecommendResultStore>(
		(set) => ({
			...initialStore,
			setResultBillId: (resultBillId: string) => {
				set((state) => ({
					...state,
					resultBillId: resultBillId,
				}));
			},
			resetRecommendResultStore: () => {
				set((state) => ({
					...state,
					...initialStore,
				}));
			},
		}),
		{
			name: "recommendResult",
		},
	),
);

export default useRecommendResultStore;

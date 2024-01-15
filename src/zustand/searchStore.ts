import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStoreType {
	searchList: string[];
	setLocalStorage: (newKeyword: string) => void;
	deleteKeyword: (indexToDelete: number) => void;
	deleteAll: () => void;
}

const useSearchStore = create(
	persist<SearchStoreType>(
		(set) => ({
			searchList: [],
			setLocalStorage: (newKeyword) =>
				set((state) => ({
					...state,
					searchList: [...state.searchList, newKeyword],
				})),
			deleteKeyword: (indexToDelete) =>
				set((state) => ({
					...state,
					searchList: state.searchList.filter(
						(_, index) => index !== indexToDelete,
					),
				})),
			deleteAll: () =>
				set((state) => ({
					...state,
					searchList: [],
				})),
		}),
		{
			name: "recent-search-keywords",
		},
	),
);

export default useSearchStore;

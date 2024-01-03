import { create } from "zustand";

const MAX_LIMIT = 5;

interface RecommendStoreType {
	genre: string[];
	artist: string[];
	track: string[];
}

const initialStore: RecommendStoreType = {
	// product
	genre: [],
	artist: [],
	track: [],

	// test
	// genre: ["acoustic"],
	// artist: ["5jbk18C7YXRcEZxUWPJCyT"],
	// track: [],
};

type RecommendStore = {
	initialStore: RecommendStoreType;
	selectGenre: (selectedGenre: string) => void;
	selectArtist: (selectedArtistId: string) => void;
	selectTrack: (selectedTrackId: string) => void;
	resetRecommendStore: () => void;
};

const updateSelection = (
	currentSelection: string[],
	selectedItem: string,
	limit: number,
) => {
	const isSelected = currentSelection.includes(selectedItem);
	const updatedSelection = isSelected
		? currentSelection.filter((item) => item !== selectedItem)
		: [...currentSelection, selectedItem].slice(0, limit);
	return updatedSelection;
};

const useRecommendStore = create<RecommendStore>((set) => ({
	initialStore,
	selectGenre: (selectedGenre: string) =>
		set((state) => ({
			initialStore: {
				...state.initialStore,
				genre: updateSelection(
					state.initialStore.genre,
					selectedGenre,
					MAX_LIMIT,
				),
			},
		})),
	selectArtist: (selectedArtistId: string) =>
		set((state) => ({
			initialStore: {
				...state.initialStore,
				artist: updateSelection(
					state.initialStore.artist,
					selectedArtistId,
					MAX_LIMIT,
				),
			},
		})),
	selectTrack: (selectedTrackId: string) =>
		set((state) => ({
			initialStore: {
				...state.initialStore,
				track: updateSelection(
					state.initialStore.track,
					selectedTrackId,
					MAX_LIMIT,
				),
			},
		})),
	resetRecommendStore: () => {
		set(() => ({
			initialStore: initialStore,
		}));
	},
}));

export default useRecommendStore;

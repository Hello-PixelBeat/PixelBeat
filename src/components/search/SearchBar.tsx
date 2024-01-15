import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon, StandardPixelBorder } from "..";
import RecentSearchList from "./RecentSearchList";
import useSearchStore from "@/zustand/storageStore";

const SearchBar = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const q = queryParams.get("q");
	const [input, setInput] = useState<string>(q ? q : "");
	const saveKeywordToStorage = useSearchStore((state) => state.setLocalStorage);
	const [recentSearchToggle, setRecentSearchToggle] = useState<boolean>(true);

	const handleRecentSearchToggle = () => {
		setRecentSearchToggle((prev) => !prev);
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleNavigateToResults = (query: string) => {
		navigate({
			pathname: "/search",
			search: `?q=${query}`,
		});
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleSearchOnKeyboard = (
		e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent,
	) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === "Enter" && input.trim() !== "") {
			handleNavigateToResults(input);
			saveKeywordToStorage(input);
			setRecentSearchToggle(false);
		}
	};

	const handleSearchOnMouse = () => {
		if (input.trim() !== "") {
			handleNavigateToResults(input);
			saveKeywordToStorage(input);
			setRecentSearchToggle(false);
		}
	};

	return (
		<div className="relative py-20">
			<StandardPixelBorder
				className="cureor-pointer absolute h-50 w-full"
				isHeight={"100%"}
			/>

			<SearchIcon isAbsolute={true} onClick={handleSearchOnMouse} />

			<input
				value={input}
				onClick={handleRecentSearchToggle}
				onKeyDown={handleSearchOnKeyboard}
				onChange={onChangeInput}
				ref={inputRef}
				placeholder="어떤 것을 듣고 싶으세요?"
				type="text"
				className="absolute left-20 top-30 h-30 w-[70%] bg-mainBlack text-mainWhite outline-none"
			/>

			{recentSearchToggle && (
				<RecentSearchList
					handleRecentSearchToggle={setRecentSearchToggle}
					handleNavigateToResults={handleNavigateToResults}
				/>
			)}
		</div>
	);
};

export default SearchBar;

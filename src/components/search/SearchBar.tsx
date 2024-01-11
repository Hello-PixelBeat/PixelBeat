import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchIcon, StandardPixelBorder } from "..";
import RecentSearchList from "./RecentSearchList";

const SearchBar = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const q = queryParams.get("q");
	const [input, setInput] = useState<string>(q ? q : "");
	const [toggleInput, setToggleInput] = useState<boolean>(true);
	const [recentSearchToggle, setRecentSearchToggle] = useState<boolean>(
		search ? true : false,
	);

	const handleRecentSearchToggle = () => {
		setRecentSearchToggle(!recentSearchToggle);
	};

	const handleInputToggle = () => {
		setToggleInput(!toggleInput);
		setRecentSearchToggle(!recentSearchToggle);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (toggleInput && inputRef.current) {
			inputRef.current.focus();
		}
	}, [toggleInput]);

	const onChangeInput = (e: any) => {
		setInput(e.target.value);
	};

	const handleNavigateToResults = (query: string) => {
		navigate({
			pathname: "/search",
			search: `?q=${query}`,
		});
	};

	const storeRecentSearchInput = (input: string) => {
		const storedRecentSearchItem = (localStorage.getItem("recent") as string)
			? (localStorage.getItem("recent") as string)
			: localStorage.setItem("recent", JSON.stringify([]));

		const parseString = storedRecentSearchItem
			? JSON.parse(storedRecentSearchItem as string).filter(
					(item: string) => item !== input,
				)
			: [];
		const updatedSearchList = [input, ...parseString].slice(0, 6);
		localStorage.setItem("recent", JSON.stringify([...updatedSearchList]));
	};

	const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (!input) return;
			handleNavigateToResults(input);
			storeRecentSearchInput(input);
			setRecentSearchToggle(false);
		}
	};

	return (
		<div className="relative py-20">
			<StandardPixelBorder
				className="absolute w-full h-50 cureor-pointer"
				isHeight={"100%"}
			/>

			<SearchIcon isAbsolute={true} onClick={handleInputToggle} />

			{toggleInput && (
				<input
					value={input}
					onClick={handleRecentSearchToggle}
					onKeyDown={handleSearch}
					onChange={onChangeInput}
					ref={inputRef}
					placeholder="어떤 것을 듣고 싶으세요?"
					type="text"
					className="absolute left-20 top-30 h-30 w-[70%] bg-mainBlack text-mainWhite outline-none"
				/>
			)}

			{recentSearchToggle && (
				<RecentSearchList
					onClickRecentSearchToggle={handleRecentSearchToggle}
					storeRecentSearchInput={storeRecentSearchInput}
					setInput={setInput}
				/>
			)}
		</div>
	);
};

export default SearchBar;

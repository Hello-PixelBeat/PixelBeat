import { useNavigate } from "react-router-dom";
import Logo from "@/assets/images/Logo.png";
import ArrowDown from "@/assets/svgs/ArrowDown.svg?react";
import MoreIcon from "@/assets/svgs/MoreIcon.svg?react";

interface HeaderProps {
	onClickLeftButton?: () => void;
	onClickRightButton?: () => void;
	isNoneMore?: boolean;
}

const HomeHeader = () => {
	const navigate = useNavigate();
	const moveToHome = () => {
		navigate("/home");
	};
	return (
		<header className="flex h-55 items-center desktop:h-62 ">
			<h1 className="cursor-pointer" onClick={moveToHome}>
				<img
					className="mx-auto w-62 desktop:w-70 "
					src={Logo}
					alt="logo image"
				/>
			</h1>
		</header>
	);
};

const PlayNowHeader = ({ onClickRightButton }: HeaderProps) => {
	return (
		<header className="relative h-55">
			<h1 className="w-full text-center text-26 leading-55 ">Playing Now</h1>
			<button
				type="button"
				className="absolute right-0 top-14 pr-20 desktop:pr-60"
				onClick={onClickRightButton}
			>
				<ArrowDown />
			</button>
		</header>
	);
};

const BgGreenHeader = ({
	onClickLeftButton,
	onClickRightButton,
	isNoneMore,
}: HeaderProps) => {
	return (
		<header className="relative flex h-55 items-center justify-between bg-mainGreen px-20 desktop:px-60">
			<button onClick={onClickLeftButton} type="button" className="rotate-90">
				<ArrowDown fill="black" />
			</button>
			{!isNoneMore && (
				<button onClick={onClickRightButton}>
					<MoreIcon fill="black" />
				</button>
			)}
		</header>
	);
};

const BgBlackHeader = ({ onClickLeftButton }: HeaderProps) => {
	return (
		<header className="relative flex h-55 items-center justify-between ">
			<button onClick={onClickLeftButton} type="button" className="rotate-90">
				<ArrowDown />
			</button>
		</header>
	);
};

const Header = ({
	type = "home",
	isNoneMore,
	onClickRightButton,
	onClickLeftButton,
}: {
	type?: string;
	isNoneMore?: boolean;
	onClickLeftButton?: () => void;
	onClickRightButton?: () => void;
}) => {
	const navigate = useNavigate();
	const handleClickBackButton = () => {
		navigate(-1);
	};
	switch (type) {
		case "home":
			return <HomeHeader />;
		case "musicPlayerFullScreen":
			return <PlayNowHeader onClickRightButton={onClickRightButton} />;
		case "ALBUM_INFO":
		case "artist":
			return <BgBlackHeader onClickLeftButton={handleClickBackButton} />;
		case "profile":
			return (
				<BgGreenHeader
					onClickLeftButton={onClickLeftButton}
					onClickRightButton={onClickRightButton}
					isNoneMore={isNoneMore}
				/>
			);
		case "bill":
			return (
				<BgGreenHeader
					onClickLeftButton={handleClickBackButton}
					onClickRightButton={onClickRightButton}
					isNoneMore={isNoneMore}
				/>
			);
		default:
			return null;
	}
};

export default Header;

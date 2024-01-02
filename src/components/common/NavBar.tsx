import { NAV_BAR_TEXT } from "@/constants/navText";
import { useLocation, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";

const NavBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleIconClick = (path: string) => {
		navigate(path);
	};

	return (
		<div className="fixed bottom-0 h-66 w-full bg-mainBlack py-23 pt-19 mobile:w-390 desktop:w-[718px] desktop:border-e-1">
			<nav className="flex items-center justify-around desktop:px-40">
				{NAV_BAR_TEXT.map(({ icon: SvgIcon, path }, idx) => (
					<NavItem
						key={path + idx}
						SvgIcon={SvgIcon}
						isSelected={location.pathname.split("/")[1] === path.split("/")[1]}
						onClick={() => handleIconClick(path)}
					/>
				))}
			</nav>
		</div>
	);
};

export default NavBar;

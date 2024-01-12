import { useLocation } from "react-router-dom";

interface SvgIconProps {
	className?: string;
}

interface NavItemProps {
	SvgIcon: React.FC<SvgIconProps>;
	currentPath: string;
	onClick: () => void;
}

const NavItem = ({ SvgIcon, onClick, currentPath }: NavItemProps) => {
	const { pathname } = useLocation();

	return (
		<div onClick={onClick}>
			<SvgIcon
				className={`cursor-pointer ${
					pathname === currentPath ? "text-mainGreen" : ""
				}`}
			/>
		</div>
	);
};
export default NavItem;

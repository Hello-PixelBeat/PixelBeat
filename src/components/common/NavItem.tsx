interface NavItemProps {
	SvgIcon: React.FC;
	isSelected: boolean;
	onClick: () => void;
}

const NavItem = ({ SvgIcon, isSelected, onClick }: NavItemProps) => (
	<div
		className={`cursor-pointer ${isSelected ? "text-mainGreen" : ""}`}
		onClick={onClick}
	>
		<SvgIcon />
	</div>
);
export default NavItem;

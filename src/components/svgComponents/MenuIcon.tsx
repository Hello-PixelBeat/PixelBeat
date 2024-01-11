const MenuIcon = () => {
	return (
		<svg
			className="h-30 w-full desktop:h-40 desktop:w-full"
			width="350"
			height="30"
			viewBox="0 0 350 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
		>
			<rect width="317" height="30" transform="translate(33)" fill="white" />
			<rect x="33" y="28" width="317" height="2" fill="black" />
			<rect x="33" width="317" height="1.8" fill="black" />
			<rect width="33.75" height="30" fill="white" />
			<rect
				x="0.9"
				y="0.9"
				width="31.95"
				height="28.2"
				stroke="black"
				strokeWidth="1.8"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.625 5.625H28.125V9.375H5.625V5.625ZM5.625 13.125H28.125V16.875H5.625V13.125ZM28.125 20.625H5.625V24.375H28.125V20.625Z"
				fill="black"
			/>
		</svg>
	);
};
export default MenuIcon;

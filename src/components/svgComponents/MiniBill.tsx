const MiniBill = ({ fillColor }: { fillColor?: string }) => {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.25 1.5H15.75V12H14.25V13.5H12.75V12H11.25V13.5H12.75V15H11.25V16.5H2.25V1.5ZM3.75 3V15H9.75V10.5H14.25V3H3.75Z"
				fill={fillColor || "white"}
			/>
		</svg>
	);
};
export default MiniBill;

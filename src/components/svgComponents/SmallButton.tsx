export const SmallButton = ({
	onClick,
	propsClass,
	text,
	fillColor,
}: {
	onClick?: () => void;
	propsClass?: string;
	text: string;
	fillColor?: string;
}) => {
	return (
		<button type={"button"} onClick={onClick} className={propsClass}>
			<svg
				width="100%"
				preserveAspectRatio="none"
				viewBox="0 0 81 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					width="80"
					height="24"
					rx="10.7955"
					fill={fillColor || "#57FF57"}
				/>
				<rect
					x="3.24707"
					y="1.08203"
					width="2.1645"
					height="2.1645"
					fill="black"
				/>
				<rect
					x="2.16455"
					y="2.16406"
					width="1.08225"
					height="3.24675"
					fill="black"
				/>
				<rect
					x="1.08252"
					y="3.24609"
					width="1.08225"
					height="3.24675"
					fill="black"
				/>
				<rect y="5.41211" width="2.1645" height="1.08225" fill="black" />
				<rect
					width="2.1645"
					height="2.1645"
					transform="matrix(-1 0 0 1 76.9146 1.08203)"
					fill="black"
				/>
				<rect
					width="1.08225"
					height="3.24675"
					transform="matrix(-1 0 0 1 77.9971 2.16406)"
					fill="black"
				/>
				<rect
					width="1.08225"
					height="3.24675"
					transform="matrix(-1 0 0 1 79.0796 3.24609)"
					fill="black"
				/>
				<rect
					width="2.1645"
					height="1.08225"
					transform="matrix(-1 0 0 1 80.1616 5.41016)"
					fill="black"
				/>
				<rect
					x="3.24707"
					y="20.752"
					width="2.1645"
					height="2.1645"
					fill="black"
				/>
				<rect
					x="2.16455"
					y="18.5879"
					width="1.08225"
					height="3.24675"
					fill="black"
				/>
				<rect
					width="1.08225"
					height="3.24675"
					transform="matrix(1 0 0 -1 1.08252 20.752)"
					fill="black"
				/>
				<rect
					width="2.1645"
					height="1.08225"
					transform="matrix(1 0 0 -1 0 18.5879)"
					fill="black"
				/>
				<rect
					width="2.1645"
					height="2.1645"
					transform="matrix(-1 0 0 1 76.9146 20.752)"
					fill="black"
				/>
				<rect
					width="1.08225"
					height="3.24675"
					transform="matrix(-1 0 0 1 77.9971 18.5879)"
					fill="black"
				/>
				<rect
					x="79.0796"
					y="20.752"
					width="1.08225"
					height="3.24675"
					transform="rotate(180 79.0796 20.752)"
					fill="black"
				/>
				<rect
					x="80.1616"
					y="18.5879"
					width="2.1645"
					height="1.08225"
					transform="rotate(180 80.1616 18.5879)"
					fill="black"
				/>
				<rect x="4.54541" width="70.2045" height="1.70455" fill="black" />
				<rect
					x="4.54541"
					y="22.8633"
					width="70.2045"
					height="1.13636"
					fill="black"
				/>
				<rect y="6.49414" width="2.1645" height="11.013" fill="black" />
				<rect
					width="2.1645"
					height="11.013"
					transform="matrix(-1 0 0 1 80.1611 6.49414)"
					fill="black"
				/>
			</svg>
			<span className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-40%] transform text-mainBlack">
				{text}
			</span>
		</button>
	);
};

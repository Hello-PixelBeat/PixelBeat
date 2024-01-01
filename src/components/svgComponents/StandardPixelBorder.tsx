export const StandardPixelBorder = ({
	className,
	onClick,
	isHeight,
}: {
	className?: string;
	onClick?: any;
	isHeight?: string | number;
}) => {
	return (
		<div className={`${className}`} onClick={onClick}>
			<svg
				width="100%"
				height={`${isHeight ? isHeight : "80"} `}
				viewBox="0 0 350 71"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<rect
					x="3.85645"
					y="1.30273"
					width="2.57084"
					height="2.60671"
					fill="currentColor"
				/>
				<rect
					x="2.5708"
					y="2.60547"
					width="1.28542"
					height="3.91006"
					fill="currentColor"
				/>
				<rect
					x="1.28564"
					y="3.91016"
					width="1.28542"
					height="3.91006"
					fill="currentColor"
				/>
				<rect
					y="6.51562"
					width="2.57084"
					height="1.30335"
					fill="currentColor"
				/>
				<rect
					width="2.57084"
					height="2.60671"
					transform="matrix(-1 0 0 1 345.822 1.30273)"
					fill="currentColor"
				/>
				<rect
					width="1.28542"
					height="3.91006"
					transform="matrix(-1 0 0 1 347.108 2.60547)"
					fill="currentColor"
				/>
				<rect
					width="2.02454"
					height="4.10556"
					transform="matrix(-1 0 0 1 348.65 4.10547)"
					fill="currentColor"
				/>
				<rect
					width="2.57084"
					height="1.30335"
					transform="matrix(-1 0 0 1 350 6.51562)"
					fill="currentColor"
				/>
				<rect
					x="3.85645"
					y="67.0898"
					width="2.57084"
					height="2.60671"
					fill="currentColor"
				/>
				<rect
					x="2.5708"
					y="64.4824"
					width="1.28542"
					height="3.91006"
					fill="currentColor"
				/>
				<rect
					width="1.28542"
					height="3.91006"
					transform="matrix(1 0 0 -1 1.28564 67.0898)"
					fill="currentColor"
				/>
				<rect
					width="2.57084"
					height="1.30335"
					transform="matrix(1 0 0 -1 0 64.4824)"
					fill="currentColor"
				/>
				<rect
					width="2.57084"
					height="2.79999"
					transform="matrix(-1 0 0 1 346.144 68.1992)"
					fill="currentColor"
				/>
				<rect
					width="1.28542"
					height="4.19998"
					transform="matrix(-1 0 0 1 347.429 65.4004)"
					fill="currentColor"
				/>
				<rect
					x="349"
					y="68"
					width="2"
					height="4"
					transform="rotate(180 349 68)"
					fill="currentColor"
				/>
				<rect
					x="350"
					y="65.4004"
					width="2.57084"
					height="1.39999"
					transform="rotate(180 350 65.4004)"
					fill="currentColor"
				/>
				<rect x="5.98291" width="338.034" height="2" fill="currentColor" />
				<rect x="6" y="69" width="340" height="2" fill="currentColor" />
				<rect y="7" width="2" height="57" fill="currentColor" />
				<rect
					width="2"
					height="58"
					transform="matrix(-1 0 0 1 350 7)"
					fill="currentColor"
				/>
			</svg>
		</div>
	);
};

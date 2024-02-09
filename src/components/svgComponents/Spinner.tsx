export const Spinner = ({
	text,
	fillColor,
}: {
	text?: string;
	fillColor?: string;
}) => {
	return (
		<div
			className={`${
				fillColor ? "my-10" : "my-288"
			} flex flex-col items-center text-center`}
		>
			<svg
				width="118"
				height="117"
				viewBox="0 0 118 117"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="25.9043"
					y="83.209"
					width="7.84431"
					height="7.84431"
					fill={fillColor || "white"}
				>
					{" "}
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>
				<rect
					x="33.748"
					y="75.3652"
					width="7.84431"
					height="7.84431"
					fill={fillColor || "white"}
				>
					{" "}
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>

				<rect
					x="18.0596"
					y="91.0547"
					width="7.84431"
					height="7.84431"
					fill={fillColor || "white"}
				>
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>
				<rect
					width="7.84431"
					height="7.84431"
					transform="matrix(-1 0 0 1 91.0117 83.209)"
					fill={fillColor || "white"}
				>
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>

				<rect
					width="7.84431"
					height="7.84431"
					transform="matrix(-1 0 0 1 83.168 75.3652)"
					fill={fillColor || "white"}
				>
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>

				<rect
					width="7.84431"
					height="7.84431"
					transform="matrix(-1 0 0 1 98.8564 91.0547)"
					fill={fillColor || "white"}
				>
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>
				<rect
					width="7.84431"
					height="7.84431"
					transform="matrix(-1 0 0 1 25.9043 18.1016)"
					fill={fillColor || "white"}
				>
					{" "}
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>

				<rect
					width="7.84431"
					height="7.84431"
					transform="matrix(-1 0 0 1 33.748 25.9453)"
					fill={fillColor || "white"}
				>
					{" "}
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>

				<rect
					width="7.84431"
					height="7.84431"
					transform="matrix(-1 0 0 1 41.5928 33.791)"
					fill={fillColor || "white"}
				>
					{" "}
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.6818181818181818s"
						repeatCount="indefinite"
					></animate>
				</rect>

				<rect
					y="55.3477"
					width="37.1317"
					height="7.00599"
					fill={fillColor || "white"}
				>
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.11363636363636363s"
						repeatCount="indefinite"
					></animate>
				</rect>

				<rect
					x="80.5684"
					y="55.3477"
					width="37.1317"
					height="7.00599"
					fill={fillColor || "white"}
				>
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.5681818181818181s"
						repeatCount="indefinite"
					></animate>
				</rect>

				<rect
					x="61.6523"
					width="37.1317"
					height="7.00599"
					transform="rotate(90 61.6523 0)"
					fill={fillColor || "white"}
				>
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.7954545454545454s"
						repeatCount="indefinite"
					></animate>
				</rect>
				<rect
					x="61.6523"
					y="79.8691"
					width="37.1317"
					height="7.00599"
					transform="rotate(90 61.6523 79.8691)"
					fill={fillColor || "white"}
				>
					<animate
						attributeName="opacity"
						values="1;0"
						keyTimes="0;1"
						dur="0.9090909090909091s"
						begin="-0.3409090909090909s"
						repeatCount="indefinite"
					></animate>
				</rect>
			</svg>
			<span
				className={`mt-65 w-full  ${
					fillColor ? "text-mainBlack" : "text-mainWhite"
				}`}
			>
				{text}
			</span>
		</div>
	);
};

const RectangleVertax = ({ height }: { height?: string }) => {
	return (
		<svg
			className="absolute"
			width="100%"
			height={height || "176"}
			viewBox="0 0 150 176"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
		>
			<mask
				id="mask0_1669_35829"
				style={{ maskType: "alpha" }}
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="150"
				height="176"
			>
				<rect x="0.000488281" width="150" height="176" fill="#D9D9D9" />
			</mask>
			<g mask="url(#mask0_1669_35829)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M9 -4H-3V3H-2.22021V8.13477H-6.23877V12.0008H1.79509V11.9995H1.79672V8.13431H5.81137V3H9V-4Z"
					fill="black"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M144.704 -4.36328V-7.33008H140.631L140.631 0.295666H140.635L140.635 1.5692H143.758L143.758 5.38025H146.884L146.884 10.4661H152.851V11.7341H160.997V4.1084H155.977V1.5692H156.26V-4.36328L144.704 -4.36328Z"
					fill="black"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M156.755 170.402L156.755 162L147.38 162L147.38 170.402L156.755 170.402ZM153.636 173.204V170.403L141.136 170.403L141.136 173.203L138 173.203L138 176.003L150.5 176.003V173.204L153.636 173.204Z"
					fill="black"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M-6.23877 170.402V162L3.1362 162L3.1362 170.402L-6.23877 170.402ZM-3.11914 173.204L-3.11914 170.403L9.38082 170.403V173.203L12.5166 173.203V176.003L0.0166016 176.003L0.016602 173.204L-3.11914 173.204Z"
					fill="black"
				/>
			</g>
		</svg>
	);
};

export default RectangleVertax;

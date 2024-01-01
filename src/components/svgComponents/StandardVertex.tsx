export const StandardVertex = ({
	className,
	fillColor,
}: {
	className?: string;
	fillColor?: string;
}) => {
	return (
		<div className={className}>
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 198 198"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<mask
					id="mask0_1669_35901"
					style={{ maskType: "alpha" }}
					maskUnits="userSpaceOnUse"
					x="0"
					y="0"
					width="198"
					height="198"
				>
					<rect width="198" height="197.998" fill="#D9D9D9" />
				</mask>
				<g mask="url(#mask0_1669_35901)">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12.3823 -4.12305H-4.11768V8.25185H-2.93164V13.2578H-8.23584V18.6341H2.36887V18.6328H2.37072V13.2587H7.67052V8.25185H12.3823V-4.12305Z"
						fill={fillColor || "currentColor"}
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M193.888 202.122H198.006L198.006 181.497L189.756 181.497L189.756 193.874L181.513 193.874L181.513 206.249L193.888 206.249V202.122Z"
						fill={fillColor || "currentColor"}
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M191.008 -4.12109V-8.24609H185.632L185.632 2.35855H185.638L185.638 4.12883H189.759V9.43025H193.886V16.5028L201.763 16.5028V18.2658H212.515V7.66113L205.888 7.66113V4.12884H206.263V-4.12109L191.008 -4.12109Z"
						fill={fillColor || "currentColor"}
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M-8.23584 189.752V177.377L4.13914 177.377L4.13914 189.752L-8.23584 189.752ZM-4.11768 193.878L-4.11768 189.753L12.3823 189.753V193.877L16.521 193.877V198.002L0.0209961 198.002V193.878L-4.11768 193.878Z"
						fill={fillColor || "currentColor"}
					/>
				</g>
			</svg>
		</div>
	);
};

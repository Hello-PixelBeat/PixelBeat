interface XbuttonProps {
	deleteItem: (e: any) => void;
	className: string;
}

export const Xbutton = ({ deleteItem, className }: XbuttonProps) => {
	return (
		<svg
			onClick={deleteItem}
			className={className}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3.75 3.75H5.25V5.25H3.75V3.75ZM5.25 5.25H6.75V6.75H5.25V5.25ZM8.25 8.25H6.75V6.75H8.25V8.25ZM9.75 8.25H8.25V9.75L6.75 9.75V11.25H5.25L5.25 12.75H3.75V14.25H5.25V12.75H6.75V11.25H8.25V9.75H9.75L9.75 11.25H11.25V12.75H12.75V14.25H14.25V12.75H12.75V11.25H11.25V9.75L9.75 9.75V8.25ZM11.25 6.75V8.25H9.75L9.75 6.75H11.25ZM12.75 5.25V6.75H11.25V5.25H12.75ZM12.75 5.25V3.75H14.25V5.25H12.75Z"
				fill="currentColor"
			/>
		</svg>
	);
};

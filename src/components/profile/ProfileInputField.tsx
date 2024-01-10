const ProfileInputField = ({
	name,
	label,
	value,
	placeholder,
	onChange,
}: {
	name: string;
	label: string;
	value: string;
	placeholder: string;
	onChange?: any;
}) => {
	return (
		<div className="w-[calc(100%-10px)]">
			<label htmlFor={name} className="text-16 text-mainWhite desktop:text-20">
				{label}
			</label>
			<input
				autoComplete="off"
				type="text"
				name={name}
				id={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`block  w-full border-b-2
                  bg-mainBlack
                    outline-none focus:border-mainGreen
    
                  `}
			/>
		</div>
	);
};
export default ProfileInputField;

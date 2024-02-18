import React from "react";

const TextInput = ({ label, value, onChange, readOnly, error }) => {
	return (
		<div className="flex flex-col">
			<label className="block text-sm font-medium mb-2 dark:text-white text-black">
				{label}
			</label>
			<input
				className="border text-black border-gray-300 rounded-md px-3 py-2"
				type="text"
				value={value}
				onChange={readOnly ? undefined : onChange} // Only set onChange if not readOnly
				readOnly={readOnly}
			/>
			{/* show an error message  */}
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
};

export default TextInput;

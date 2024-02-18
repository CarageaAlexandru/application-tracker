import React from "react";

// Correctly defining the TextArea component for controlled usage
const TextArea = ({ value, onChange, label, readOnly }) => {
	return (
		<div className="flex flex-col">
			<label className="block text-sm font-medium mb-2 dark:text-white text-black">
				{label}
			</label>
			<textarea
				className="py-3 px-4 block w-full border text-black border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
				rows="3"
				placeholder="Notes"
				value={value}
				onChange={readOnly ? undefined : onChange} // Only set onChange if not readOnly
				readOnly={readOnly}
			/>
		</div>
	);
};

export default TextArea;

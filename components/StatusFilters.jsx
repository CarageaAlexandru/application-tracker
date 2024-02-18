// components/JobStatusFilters.js
export default function StatusFilters({ onFilterSelect }) {
	// These would likely be managed via state in a real app
	const filters = [
		{ name: "Applied", color: "bg-green-500" },
		{ name: "Not Applied", color: "bg-gray-500" },
		{ name: "Closed", color: "bg-red-500" },
		{ name: "Assessment", color: "bg-yellow-500" },
		{ name: "Rejected", color: "bg-pink-500" },
		{ name: "Interview", color: "bg-blue-500" },
	];
	return (
		<div className="bg-white rounded-lg shadow p-4 m-3">
			<h2 className="text-lg  text-black font-bold mb-4">Status</h2>
			<div className="flex justify-between flex-wrap">
				{filters.map((filter) => (
					<button
						key={filter.name}
						className={`${filter.color} text-white rounded px-3 py-1 m-1 focus:outline-none focus:ring hover:opacity-90`}
						onClick={() => onFilterSelect(filter.name)}
					>
						{filter.name}
					</button>
				))}
			</div>
		</div>
	);
}

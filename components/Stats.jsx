// components/Stats.js
export default function Stats() {
	// These would likely come from props or state in a real app
	const stats = [
		{ label: "This Month", value: 9 },
		{ label: "October", value: 0 },
	];

	return (
		<div className="bg-white rounded-lg shadow p-4 m-3">
			<h2 className="text-lg font-bold mb-4 text-black">Stats</h2>
			{stats.map((stat) => (
				<div
					key={stat.label}
					className="flex justify-between items-center mb-2"
				>
					<span className="text-gray-700">{stat.label}</span>
					<span className="text-blue-600">{stat.value}</span>
				</div>
			))}
		</div>
	);
}

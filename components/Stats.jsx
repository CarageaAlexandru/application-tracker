import React, { useState, useEffect } from "react";
const currentMonth = new Date().toLocaleString("default", { month: "long" });

export default function Stats() {
	const [currentMonthCount, setCurrentMonthCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	const fetchCurrentMonthCount = async () => {
		try {
			const response = await fetch("/api/applications/current-month");
			const data = await response.json();
			setCurrentMonthCount(data.count);
		} catch (error) {
			console.error("Error fetching jobs:", error);
		}
	};

	const fetchAllApplicationsCount = async () => {
		try {
			const response = await fetch("/api/applications/all");
			const data = await response.json();
			setTotalCount(data.count);
		} catch (error) {
			console.error("Error fetching jobs:", error);
		}
	};

	useEffect(() => {
		// Fetch the count of applications for the current month
		fetchCurrentMonthCount();
		// Fetch the total count of applications
		fetchAllApplicationsCount();
	}, []);

	return (
		<div className="bg-white rounded-lg shadow p-4 m-3">
			<h2 className="text-lg font-bold mb-4 text-black">Stats</h2>
			<div className="flex justify-between items-center mb-2">
				<span className="text-gray-700">{currentMonth}</span>
				<span className="text-blue-600">{currentMonthCount}</span>
			</div>
			<div className="flex justify-between items-center mb-2">
				<span className="text-gray-700">Total Applications</span>
				<span className="text-blue-600">{totalCount}</span>
			</div>
		</div>
	);
}

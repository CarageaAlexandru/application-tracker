import React, { useState, useEffect } from "react";

// components/JobStatusFilters.js
export default function Websites() {
	const [websites, setWebsites] = useState([]);

	const fetchJobSites = async () => {
		try {
			const response = await fetch("/api/get-websites");
			const data = await response.json();
			setWebsites(data);
		} catch (error) {
			console.error("Error fetching job sites:", error);
		}
	};

	useEffect(() => {
		fetchJobSites();
	}, []);

	return (
		<div className="bg-white rounded-lg shadow p-4 m-3">
			<h2 className="text-lg  text-black font-bold mb-4">Websites</h2>
			<div className="flex justify-between flex-wrap">
				{websites.map((website, index) => (
					<button
						key={index}
						className="bg-blue-500 text-white rounded px-3 py-1 m-1 focus:outline-none focus:ring hover:opacity-90"
					>
						{website}
					</button>
				))}
			</div>
		</div>
	);
}

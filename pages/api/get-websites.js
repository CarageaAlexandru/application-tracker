// pages/api/job-sites.js
import { sql } from "@vercel/postgres";
import { URL } from "url";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).end(); // Method Not Allowed
	}

	try {
		const { rows } = await sql`SELECT job_link FROM applications`;

		// Extract the base URL from each job link
		const jobSites = [
			...new Set(
				rows.map((row) => {
					const url = new URL(row.job_link);
					return `${url.protocol}//${url.hostname}`;
				})
			),
		];

		res.status(200).json(jobSites);
	} catch (error) {
		console.error("Error fetching job sites:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

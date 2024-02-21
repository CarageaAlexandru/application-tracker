// pages/api/jobs.js
import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).end(); // Method Not Allowed
	}

	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	try {
		const { rows } =
			await sql`SELECT * FROM applications ORDER BY id LIMIT ${limit} OFFSET ${offset}`;
		res.status(200).json(rows);
	} catch (error) {
		console.error("Error fetching jobs:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).end(); // Method Not Allowed
	}

	try {
		const { rows } = await sql`SELECT * FROM applications`;
		res.status(200).json(rows);
	} catch (error) {
		console.error("Error fetching jobs:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

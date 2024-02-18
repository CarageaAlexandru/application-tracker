import { createClient } from "@vercel/postgres";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const client = createClient({
		connectionString: process.env.DATABASE_URL,
	});

	await client.connect();

	try {
		// Get the current month and year
		const date = new Date();
		const month = date.getMonth() + 1; // JavaScript months are 0-indexed
		const year = date.getFullYear();

		// Query to get jobs from the current month
		const { rows } = await client.sql`
      SELECT *
      FROM applications
      WHERE EXTRACT(MONTH FROM application_date) = ${month}
      AND EXTRACT(YEAR FROM application_date) = ${year}
    `;
		// send only the count
		const count = rows.length;

		res.status(200).json({ count });
	} catch (error) {
		console.error("Error fetching jobs:", error);
		res.status(500).json({ message: "Internal Server Error" });
	} finally {
		await client.end();
	}
}

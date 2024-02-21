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
		// Query to get all applications
		const { rows } = await client.sql`
      SELECT *
      FROM applications
    `;
		const count = rows.length;

		res.status(200).json({ count });
	} catch (error) {
		console.error("Error fetching applications:", error);
		res.status(500).json({ message: "Internal Server Error" });
	} finally {
		await client.end();
	}
}

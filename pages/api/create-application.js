// pages/api/create-job.js
import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { jobLink, jobTitle, fetchedDescription, status, date, notes } =
		req.body;
	// stringify the description
	try {
		const result = await sql`
            INSERT INTO applications (job_link, job_title, description, status, application_date, notes)
            VALUES (${jobLink}, ${jobTitle}, ${fetchedDescription}, ${status}, ${date}, ${notes})
        `;

		return res.status(200).json({ message: "Job created successfully" });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred", error: error.message });
	}
}

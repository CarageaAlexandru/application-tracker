// pages/api/shorten.js
import { nanoid } from "nanoid";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

export default async function handler(req, res) {
	if (req.method === "POST") {
		const url = req.body.url;
		const id = nanoid(5);
		await pool.query("INSERT INTO urls (id, url) VALUES ($1, $2)", [id, url]);
		res.status(200).json({ id });
	} else if (req.method === "GET") {
		const id = req.query.id;
		const { rows } = await pool.query("SELECT url FROM urls WHERE id = $1", [
			id,
		]);
		const url = rows[0]?.url;
		if (url) {
			res.redirect(url);
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} else {
		res.status(405).end();
	}
}

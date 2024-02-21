// pages/api/shorten.js
import { nanoid } from "nanoid";

let urls = {};

export default function handler(req, res) {
	if (req.method === "POST") {
		const url = req.body.url;
		const id = nanoid(5);
		urls[id] = url;
		res.status(200).json({ id });
	} else if (req.method === "GET") {
		const id = req.query.id;
		const url = urls[id];
		if (url) {
			res.redirect(url);
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} else {
		res.status(405).end();
	}
}

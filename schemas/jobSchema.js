import { z } from "zod";

export const jobSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z
		.string()
		.min(10, "Description should be at least 10 characters"),
	company: z.string().min(1, "Company name is required"),
});

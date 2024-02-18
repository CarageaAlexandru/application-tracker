import { z } from "zod";

export const jobFormSchema = z.object({
	jobLink: z.string().url(),
	jobTitle: z.string().min(1, "Job title is required"),
	fetchedDescription: z.string().min(1, "Description is required"),
	status: z.enum([
		"Applied",
		"Not Applied",
		"Closed",
		"Assessment",
		"Rejected",
		"Interview",
	]),
	date: z.date(),
	notes: z.string().optional(),
});

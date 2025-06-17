import { z } from "zod";

const subcategorySchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	slug: z.string().min(1, "Slug is required"),
	deletedAt: z.date().nullable().optional(),
});

export default subcategorySchema;

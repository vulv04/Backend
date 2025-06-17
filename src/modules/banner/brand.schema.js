import { z } from "zod";

const brandSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  deletedAt: z.date().nullable().optional(),
  slug: z.string().min(1, "Slug là bắt buộc"),
});
export default brandSchema;

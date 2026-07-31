import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),

  summary: z.string().min(20, "Summary must be at least 20 characters"),

  content: z.string().min(50, "Content must be at least 50 characters"),

  cover_image: z.string().optional().or(z.literal("")),

  category_id: z.string().min(1, "Please select a category"),

  status: z.enum(["draft", "published", "archived"]).optional(),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;
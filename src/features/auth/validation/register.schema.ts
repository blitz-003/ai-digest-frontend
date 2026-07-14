import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30),

  full_name: z
    .string()
    .min(2)
    .max(100),

  email: z.email(),

  password: z
    .string()
    .min(6),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
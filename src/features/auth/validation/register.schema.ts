import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30),

    full_name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100),

    email: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirm_password: z.string(),
  })
  .refine(
    (data) => data.password === data.confirm_password,
    {
      path: ["confirm_password"],
      message: "Passwords do not match",
    }
  );

export type RegisterSchema = z.infer<typeof registerSchema>;
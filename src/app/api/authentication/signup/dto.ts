import { z } from "zod";

export const signupSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email")
        .min(5, "Email must be at least 5 characters")
        .max(50, "Email must be less than 50 characters"),

    name: z.string().min(3, "Username must be at least 3 characters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters"),
});

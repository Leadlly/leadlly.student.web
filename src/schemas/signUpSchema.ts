import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(4, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
});

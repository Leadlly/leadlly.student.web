import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "Full name is required!" })
    .min(4, { message: "Please enter your full name" }),
  email: z
    .string({ required_error: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  password: z
    .string({ required_error: "Password is required!" })
    .min(8, { message: "Password must be at least 8 characters!" }),
});

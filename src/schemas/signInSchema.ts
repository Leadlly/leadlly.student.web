import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter your email" }),
  password: z.string().min(8, { message: "Please enter your password" }),
});

import { z } from "zod";

export const AccountStudyFormSchema = z.object({
  chapters: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .min(1, { message: "Please select at least one chapter" })
    .default([]),
});

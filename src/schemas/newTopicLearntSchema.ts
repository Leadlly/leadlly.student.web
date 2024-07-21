import { z } from "zod";

export const NewTopicLearntSchema = z.object({
  chapterName: z.string({ required_error: "Please select a chapter!" }),
  topicNames: z
    .string({ required_error: "Please select at least one topic" })
    .array()
    .min(1, { message: "Please select at least one topic" })
    .default([]),
});

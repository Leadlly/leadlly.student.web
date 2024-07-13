import { z } from "zod";

export const RequestMeetingFormSchema = z.object({
  date_of_meeting: z.date({
    required_error: "A date is required to request meeting.",
  }),
  time: z.string({ required_error: "A time is required to request meeting!" }),
  meeting_agenda: z.string({
    required_error: "Please enter your meeting agenda",
  }),
});

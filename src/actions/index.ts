import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { delay } from "~/utils/delay";

const sendEmail = defineAction({
  accept: "form",
  input: z.object({
    name: z
      .string({ message: "Name is required." })
      .min(1, "Name is required."),
    email: z
      .string({ message: "Email is required." })
      .email("Please enter a valid email address."),
    message: z
      .string({ message: "Message cannot be empty." })
      .min(1, "Message cannot be empty."),
  }),
  handler: async (input) => {
    await delay(1000);
    return (
      "Thank you! Your message has been sent successfully. I'll get back to you soon." +
      input.email
    );
  },
});

export const server = {
  testAction: defineAction({
    accept: "form",
    input: z.object({
      // name: z.string(),
      email: z.string(),
    }),
    handler: async (input) => {
      await delay(1000);
      return (
        "Thank you! Your message has been sent successfully. I'll get back to you soon." +
        input.email
      );
    },
  }),
  sendEmail,
};

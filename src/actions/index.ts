import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { delay } from "~/utils/delay";

const sendEmail = defineAction({
  accept: "form",
  input: z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string().min(1),
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

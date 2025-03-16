import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getMailOptions, transporter } from "~/lib/mail";
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
    try {
      const mailOptions = getMailOptions(input);
      await transporter.sendMail(mailOptions);
      return "Thank you! Your message has been sent successfully. I'll get back to you soon.";
    } catch (error) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send email, try agail later.",
      });
    }
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

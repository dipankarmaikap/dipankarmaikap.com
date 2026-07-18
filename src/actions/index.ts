import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { getMailOptions, transporter } from "~/lib/mail";
import { delay } from "~/utils/delay";

const MIN_SUBMIT_TIME = 3000;

const input = z.object({
  name: z.string().min(1, {
    error: "Name is required.",
  }),

  email: z.email({
    error: "Please enter a valid email address.",
  }),

  message: z.string().min(1, {
    error: "Message cannot be empty.",
  }),

  website: z.string().optional(),
  timestamp: z.string().optional(),
});

const sendEmail = defineAction({
  accept: "form",
  input,
  handler: async (input) => {
    if (input.website) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Spam detected.",
      });
    }

    if (input.timestamp) {
      const elapsed = Date.now() - Number(input.timestamp);
      if (elapsed < MIN_SUBMIT_TIME) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Please wait a moment before submitting.",
        });
      }
    }

    try {
      const mailOptions = getMailOptions(input);
      await transporter.sendMail(mailOptions);
      return "Thank you! Your message has been sent successfully. I'll get back to you soon.";
    } catch (error) {
      console.error("Error sending email:", error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send email, try again later.",
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

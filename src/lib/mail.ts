import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: import.meta.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASSWORD,
  },
});

interface MailOptions {
  name: string;
  email: string;
  message: string;
}
export function getMailOptions({ name, email, message }: MailOptions) {
  return {
    from: `"${name}" <${import.meta.env.SMTP_USER}>`,
    to: import.meta.env.MY_EMAIL, // Your email to receive messages
    replyTo: email, // Allows you to reply directly to the sender
    subject: "New Contact Form Submission",
    html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
  };
}

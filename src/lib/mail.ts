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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface MailOptions {
  name: string;
  email: string;
  message: string;
}
export function getMailOptions({ name, email, message }: MailOptions) {
  return {
    from: `"dipankarmaikap.com" <${import.meta.env.SMTP_USER}>`,
    to: import.meta.env.MY_EMAIL,
    replyTo: email,
    subject: "New Contact Form Submission",
    html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
  };
}

import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env["EMAIL_API_KEY"] as string);
export const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  const email = {
    to: to,
    from: { email: "email@homeit.app", name: "HomeIt" },
    subject: subject,
    html: html,
  };
  await sgMail.send(email);
};

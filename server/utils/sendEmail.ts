import nodemailer from "nodemailer";
import { IS_PRODUCTION } from "../../config/constants";

async function sendEmail(
  email: string,
  text: string,
  html: string,
  subject: string
): Promise<void> {
  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: IS_PRODUCTION ? "mail.privateemail.com" : "smtp.ethereal.email",
      port: IS_PRODUCTION ? 465 : 587,
      secure: IS_PRODUCTION,
      auth: {
        user: IS_PRODUCTION ? process.env.EMAIL : testAccount.user,
        pass: IS_PRODUCTION ? process.env.EMAIL_PASSWORD : testAccount.pass,
      },
    });
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text,
      html,
    });
    console.log("info,", info);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    throw new Error(error);
  }
}

export default sendEmail;

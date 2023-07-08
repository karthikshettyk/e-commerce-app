import config from "../config/index.js";
import nodemailer from "nodemailer";

const mailHelper = async (option) => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: config.SMTP_MAIL_PORT,
    auth: {
      user: config.SMTP_MAIL_USERNAME,
      pass: config.SMTP_MAIL_PASSWORD,
    },
  });

  const message = {
    from: "karthikshettykakathota@gmail.com",
    to: option.to,
    subject: option.subject,
    text: option.text,
  };

  await transporter.sendMail(message);
};

export default mailHelper;

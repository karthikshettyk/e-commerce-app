import dotenv from "dotenv";

dotenv.config();

let config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL:process.env.MONGODB_URL || "mongodb://localhost:27017/backendapp",
  JWT_SECRET: process.env.JWT_SECRET || "karthikcoder",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
  SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
  SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
  SMTP_MAIL_USERNAME: process.env.SMTP_MAIL_USERNAME,
  SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
  SMTP_SENDER_EMAIL: process.env.SMTP_SENDER_EMAIL,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET
};

export default config;

import nodemailer from "nodemailer";
import { logger } from "../logger/logger";

export const sendOTP = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from:`Tasko <${process.env.EMAIL_USER}>` ,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp} expires in 15 minutes. Please do not share this OTP with anyone.`,
  });

  logger.info("OTP sent to email: %s", email);
};

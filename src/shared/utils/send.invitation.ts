import nodemailer from "nodemailer";
import { logger } from "../logger/logger";


  export const sendInviteEmail  = async(email: string, inviteLink: string)=>{
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email service is not configured");
    }

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
            
        }
    })

    const info = await transporter.sendMail({
    from: `Tasko <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "You're invited to join Tasko",
    text: `You have been invited to join Tasko. Create your account here: ${inviteLink}. This link expires in 48 hours.`,
     html: `
      <p>You have been invited to join Tasko.</p>
      <p>Click below to create your account:</p>
      <a href="${inviteLink}">${inviteLink}</a>
      <p>This link expires in 48 hours.</p>
    `
    })

    const accepted = (info.accepted ?? []).map(String);
    if (!accepted.includes(email)) {
      logger.error("Invite email was not accepted by mail server", {
        email,
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
      });
      throw new Error("Invite email was rejected by mail server");
    }

    logger.info("Invite email sent to %s", email);
}
 

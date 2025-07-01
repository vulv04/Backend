import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../configs/enviroments.js";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});


const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Clothing Store 👕" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent: %s", info.messageId);
  } catch (error) {
    console.error("❌ Lỗi gửi email:", error.message);
    throw error; // Rất quan trọng để báo lỗi về controller
  }
};

export default sendEmail;

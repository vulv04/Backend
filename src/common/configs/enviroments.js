import dotenv from "dotenv";

dotenv.config({
  path: ".env",
  debug: false,
  encoding: "utf8",
});

// Export mọi biến bạn cần dùng
export const {
  DB_URI,
  HOST,
  PORT,
  EMAIL_USER,
  EMAIL_PASS,
  JWT_SECRET,
  CLIENT_URL,
} = process.env;

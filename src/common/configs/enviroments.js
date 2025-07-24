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
  PAYOS_CLIENT_ID,
  PAYOS_API_KEY,
  PAYOS_CLIENT_SECRET,
  PAYOS_CHECKSUM_KEY,
  NGROK_AUTH_TOKEN,
} = process.env;

import mongoose from "mongoose";
import { DB_URI, NGROK_AUTH_TOKEN } from "./enviroments.js";
import { confirmWebhook } from "../../modules/order/order.controller.js";

function connectDB() {
  mongoose
    .connect(DB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .then(async () => {})
    .catch((err) => console.error("MongoDB connection error:", err));
}

export default connectDB;

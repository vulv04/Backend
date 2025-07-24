import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cors from "cors";
import setupSwagger from "./src/common/configs/swagger-config.js";
import morgan from "morgan";
import {
  handlePayOsWebhook,
  payOS,
} from "./src/modules/order/order.comntroller.js";
import { NGROK_AUTH_TOKEN } from "./src/common/configs/enviroments.js";
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", // hoặc 5173 nếu dùng Vite
    credentials: true,
  })
);
app.use(express.json());
app.post("/webhook", handlePayOsWebhook);
app.use("/api", router);
setupSwagger(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
    console.log("Swagger UI: http://localhost:3000/api-docs");
    const ngrok = await import("@ngrok/ngrok");
    const listener = await ngrok.forward({
      addr: 3000,
      authtoken: NGROK_AUTH_TOKEN,
    });
    const urlNgrokWebhook = `${listener.url()}/webhook`;
    console.log(urlNgrokWebhook);
    await payOS.confirmWebhook(urlNgrokWebhook);
  })
  .catch((err) => console.error("MongoDB error:", err));

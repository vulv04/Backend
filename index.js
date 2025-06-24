import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cors from "cors";
import setupSwagger from "./src/common/configs/swagger-config.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // hoặc 5173 nếu dùng Vite
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", router);
setupSwagger(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
    console.log("Swagger UI: http://localhost:3000/api-docs");
  })
  .catch((err) => console.error("MongoDB error:", err));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import cors from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js";
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
app.use("/uploads", express.static("uploads"));
app.use("/api", uploadRoutes); // Đường dẫn tới file routes/upload.js
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("MongoDB error:", err));

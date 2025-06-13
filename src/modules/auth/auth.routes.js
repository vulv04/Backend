import express from "express";
import { protect } from "../../common/middlewares/authMiddleware.js";
import { restrictTo } from "../../common/middlewares/roleMiddleware.js";
import { login, register } from "./auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

// test bảo vệ
authRoutes.get("/admin-only", protect, restrictTo("admin"), (req, res) => {
  res.json({ message: "Chào admin", user: req.user });
});

export default authRoutes;

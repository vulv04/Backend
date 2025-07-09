import express from "express";
import { protect } from "../../common/middlewares/authMiddleware.js";
import { restrictTo } from "../../common/middlewares/roleMiddleware.js";
import { login, register, verifyEmail } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify-email", verifyEmail);

// test bảo vệ
authRouter.get("/admin-only", protect, restrictTo("admin"), (req, res) => {
  res.json({ message: "Chào admin", user: req.user });
});

export default authRouter;

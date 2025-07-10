// routes/user.routes.js
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.controller.js";
import { isAdmin, protect } from "../../common/middlewares/authMiddleware.js";

const userRouter = Router();

// Route bảo vệ bằng middleware protect + admin
userRouter.get("/", protect, isAdmin, getAllUsers);
userRouter.get("/:id", protect, isAdmin, getUserById);
userRouter.put("/:id", protect, isAdmin, updateUser);
userRouter.delete("/:id", protect, isAdmin, deleteUser);

export default userRouter;

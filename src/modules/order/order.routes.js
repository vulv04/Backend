import { Router } from "express";
import { isAdmin, protect } from "../../common/middlewares/authMiddleware.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "./order.comntroller.js";

const orderRouter = Router();

// Route: /api/orders
orderRouter.post("/", protect, createOrder); // Create new order
orderRouter.get("/", protect, isAdmin, getAllOrders); // Get all orders (admin)
orderRouter.get("/:id", protect, getOrderById); // Get order detail
orderRouter.put("/:id", protect, isAdmin, updateOrderStatus); // Update status
orderRouter.delete("/:id", protect, isAdmin, deleteOrder); // Delete order
orderRouter.get("/my-orders", protect, getMyOrders);

export default orderRouter;

import { Router } from "express";
import { isAdmin, protect } from "../../common/middlewares/authMiddleware.js";
import {
  cancelOrder,
  createOrder,
  createPayosPayment,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "./order.comntroller.js";

const orderRouter = Router();

// Route: /api/orders
orderRouter.post("/", protect, createOrder); // Create new order
orderRouter.get("/", protect, getAllOrders); // Get all orders (admin)
orderRouter.get("/:id", protect, getOrderById); // Get order detail
orderRouter.put("/orders/:id/cancel", protect, cancelOrder);
orderRouter.put("/:id", protect, isAdmin, updateOrderStatus); // Update status
orderRouter.delete("/:id", protect, isAdmin, deleteOrder); // Delete order
orderRouter.post("/payos", protect, createPayosPayment);

export default orderRouter;

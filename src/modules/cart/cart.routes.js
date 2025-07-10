import Router from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "./cart.controller.js";
import { protect } from "../../common/middlewares/authMiddleware.js";

const cartRouter = Router();

cartRouter.use(protect);

cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.delete("/:productId", removeFromCart);
cartRouter.put("/update", protect, updateCartQuantity);

export default cartRouter;

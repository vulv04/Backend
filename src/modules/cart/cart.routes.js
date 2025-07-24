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
cartRouter.delete("/delete", removeFromCart);
cartRouter.patch("/update-quantity", updateCartQuantity);

export default cartRouter;

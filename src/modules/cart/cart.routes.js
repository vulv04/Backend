import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeCartItem,
} from "./cart.controller.js";
import { protect } from "../../common/middlewares/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.put("/:productId", updateCart);
cartRouter.delete("/:productId", removeCartItem);

export default cartRouter;

import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
const cartRoutes = express.Router();

cartRoutes.get("/", getCart);
cartRoutes.post("/", addToCart);
cartRoutes.delete("/:id", removeFromCart);

export default cartRoutes;

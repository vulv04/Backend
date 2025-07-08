import Router from "express";
import { addToCart, getCart, removeFromCart } from "./cart.controller.js";
import { protect } from "../../common/middlewares/authMiddleware.js";

const cartRouter = Router();

cartRouter.use(protect);

cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.delete("/:productId", removeFromCart);

export default cartRouter;

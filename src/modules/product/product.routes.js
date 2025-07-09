import { Router } from "express";
import {
  createProduct,
  hardDeleteProduct,
  getListProduct,
  getProductDetail,
  updateProduct,
  restoreProduct,
} from "./prodcut.controller.js";

const producRouter = Router();
producRouter.get("/", getListProduct);
producRouter.get("/:id", getProductDetail);
producRouter.post("/", createProduct);
producRouter.patch("/:id", updateProduct);
producRouter.delete("/:id", hardDeleteProduct);
producRouter.patch("/:id", restoreProduct);

export default producRouter;

import { Router } from "express";
import {
  createProduct,
  hardDeleteProduct,
  getListProduct,
  getProductDetail,
  updateProduct,
  restoreProduct,
  softDeleteProduct,
} from "./product.controller.js";

const producRouter = Router();
producRouter.patch("/:id/soft-delete", softDeleteProduct);
producRouter.patch("/:id/restore", restoreProduct);
producRouter.delete("/:id/force", hardDeleteProduct);
producRouter.get("/", getListProduct);
producRouter.get("/:id", getProductDetail);
producRouter.post("/", createProduct);
producRouter.patch("/:id", updateProduct);

export default producRouter;

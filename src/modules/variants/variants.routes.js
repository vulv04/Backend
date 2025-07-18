import express from "express";
import {
  createVariant,
  getVariantsByProductId,
  getVariantById,
  updateVariant,
  deleteVariant,
  getVariants,
} from "../variants/variants.controller.js";

const variantRouter = express.Router();

variantRouter.post("/", createVariant);
variantRouter.get("/", getVariants);
variantRouter.get("/product/:productId", getVariantsByProductId);
variantRouter.get("/:id", getVariantById);
variantRouter.put("/:id", updateVariant);
variantRouter.delete("/:id", deleteVariant);

export default variantRouter;

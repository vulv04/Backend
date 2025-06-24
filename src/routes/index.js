import { Router } from "express";
import producRoutes from "../modules/product/product.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import commentRoutes from "../modules/comment/commentRoutes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";

const router = Router();
router.use("/products", producRoutes);
router.use("/categories", categoryRoutes);
router.use("/sub-categories", subCategoryRoutes);
router.use("/auth", authRoutes);
router.use("/comments", commentRoutes);
router.use("/cart", cartRoutes);

export default router;

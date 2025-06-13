import { Router } from "express";
import producRoutes from "../modules/product/product.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import commentRoutes from "../modules/comment/commentRoutes.js";

const router = Router();
router.use("/products", producRoutes);
router.use("/categories", categoryRoutes);
router.use("/auth", authRoutes);
router.use("/comments", commentRoutes);
export default router;

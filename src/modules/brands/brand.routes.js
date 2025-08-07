import { Router } from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  softDeleteBrand,
  restoreBrand,
  getTrashedBrands,
  toggleBrandStatus,
} from "./brand.controller.js";

const brandRouter = Router();

brandRouter.get("/", getAllBrands);
brandRouter.get("/trash", getTrashedBrands);
brandRouter.post("/", createBrand);
brandRouter.get("/:id", getBrandById);
brandRouter.put("/:id", updateBrand);
brandRouter.patch("/restore/:id", restoreBrand);
brandRouter.patch("/soft-delete/:id", softDeleteBrand);
brandRouter.delete("/:id", deleteBrand);
brandRouter.patch("/:id/toggle-status", toggleBrandStatus);
export default brandRouter;
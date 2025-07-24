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
brandRouter.get("/trash", getTrashedBrands); // 👈 Danh sách thùng rác
brandRouter.post("/", createBrand);
brandRouter.get("/:id", getBrandById);
brandRouter.put("/:id", updateBrand);
brandRouter.patch("/restore/:id", restoreBrand); // 👈 Khôi phục
brandRouter.patch("/soft-delete/:id", softDeleteBrand); // 👈 Xoá mềm
brandRouter.delete("/:id", deleteBrand); // 👈 Xoá cứng
brandRouter.patch("/:id/toggle-status", toggleBrandStatus);
export default brandRouter;
import { Router } from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "./brand.controller.js";

const brandRouter = Router();

brandRouter.get("/", getAllBrands);
brandRouter.post("/", createBrand);
brandRouter.get("/:id", getBrandById);
brandRouter.put("/:id", updateBrand);
brandRouter.delete("/:id", deleteBrand);

export default brandRouter;

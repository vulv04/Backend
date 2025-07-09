import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getDetailSubCategory,
  getListSubCategory,
  restoreSubCategory,
  softDeleteSubCategory,
  updateSubCategory,
} from "./subcategory.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import categorySchema from "./subcategory.schema.js";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getListSubCategory);

subCategoryRouter.get("/:id", getDetailSubCategory);
subCategoryRouter.delete("/delete/:id", deleteSubCategory);
subCategoryRouter.delete("/soft-delete/:id", softDeleteSubCategory);
subCategoryRouter.patch("/restore/:id", restoreSubCategory);

subCategoryRouter.use(validBodyRequest(categorySchema));
subCategoryRouter.post("/", createSubCategory);
subCategoryRouter.patch("/:id", updateSubCategory);

export default subCategoryRouter;

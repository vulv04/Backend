import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getDetailCategory,
  getListCategorys,
  softDeleteCategory,
  updateCategory,
} from "./category.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import categorySchema from "./category.schema.js";

const categoryRouter = Router();

categoryRouter.get("/", getListCategorys);

categoryRouter.get("/:id", getDetailCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.delete("/soft-delete/:id", softDeleteCategory);

categoryRouter.use(validBodyRequest(categorySchema));
categoryRouter.post("/", createCategory);
categoryRouter.patch("/:id", updateCategory);

export default categoryRouter;

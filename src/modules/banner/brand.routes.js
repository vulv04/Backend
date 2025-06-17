import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getDetailBrand,
  getListBrand,
  softDeleteBrand,
  updateBrand,
} from "./brand.controller";
import validBodyRequest from "../../common/middlewares/validBodyRequest";
import brandSchema from "./brand.schema";

const brandRouter = Router();
brandRouter.get("/", getListBrand);
brandRouter.get("/:id", getDetailBrand);
brandRouter.delete("/:id", deleteBrand);
brandRouter.delete("soft-delete/:id", softDeleteBrand);

brandRouter.use(validBodyRequest(brandSchema));
brandRouter.post("/", createBrand);
brandRouter.patch("/:id", updateBrand);

export default brandRouter;

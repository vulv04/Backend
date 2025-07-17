import { Router } from "express";
import {
  createBanner,
  deleteBanner,
  getDetailBanner,
  getListBanner,
  softDeleteBanner,
  updateBanner,
} from "./banner.controller";

const bannerRouter = Router();

bannerRouter.get("/", getListBanner);
bannerRouter.get("/:id", getDetailBanner);
bannerRouter.post("/", createBanner);
bannerRouter.put("/:id", updateBanner);
bannerRouter.delete("/:id", deleteBanner);
bannerRouter.patch("/soft-delete/:id", softDeleteBanner);

export default bannerRouter;

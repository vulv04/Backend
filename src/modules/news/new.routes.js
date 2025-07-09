import { Router } from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getNewsBySlug,
  updateNews,
} from "./new.controller";
import { isAdmin, protect } from "../../common/middlewares/authMiddleware";

const newsRouter = Router();

newsRouter.post("/", protect, isAdmin, createNews);
newsRouter.get("/", getAllNews);
newsRouter.get("/:slug", getNewsBySlug);
newsRouter.put("/:id", protect, isAdmin, updateNews);
newsRouter.delete("/:id", protect, isAdmin, deleteNews);

export default newsRouter;

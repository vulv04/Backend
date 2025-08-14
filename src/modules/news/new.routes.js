import { Router } from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getNewsById,
  getNewsBySlug,
  updateNews,
} from "./new.controller";
import {  protect } from "../../common/middlewares/authMiddleware";

const newsRouter = Router();

newsRouter.post("/", protect , createNews);
newsRouter.get("/", getAllNews);
newsRouter.get("/:id", getNewsById);
newsRouter.get("/:slug", getNewsBySlug);
newsRouter.put("/:id", protect, updateNews);
newsRouter.delete("/:id", protect, deleteNews);

export default newsRouter;

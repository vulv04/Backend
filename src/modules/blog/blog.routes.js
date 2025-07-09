import Router from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "./blog.controller.js";
import { protect } from "../../common/middlewares/authMiddleware.js";

const blogRouter = Router();

blogRouter.post("/", protect, createBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:slug", getBlogBySlug);
blogRouter.put("/:id", protect, updateBlog);
blogRouter.delete("/:id", protect, deleteBlog);

export default blogRouter;

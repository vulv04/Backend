import express from "express";
import { addComment, getCommentsByProductId } from "./comment.controller.js";
const commentRoutes = express.Router();

commentRoutes.get("/:productId", getCommentsByProductId);
commentRoutes.post("/", addComment);

export default commentRoutes;

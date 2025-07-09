import Router from "express";
import { addComment, getCommentsByProductId } from "./comment.controller";
const commentRouter = Router();

commentRouter.get("/:productId", getCommentsByProductId);
commentRouter.post("/", addComment);

export default commentRouter;

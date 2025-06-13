import { Router } from "express";
import { createCategory } from "./category.controller.js";

const categoryRoutes = Router();
categoryRoutes.post("/", createCategory);

export default categoryRoutes;

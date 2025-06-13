import { Router } from "express";
import { createProduct, deleteProduct, getListProduct, getProductDetail, updateProduct } from "./prodcut.controller.js";

const producRoutes = Router();
producRoutes.get("/", getListProduct);
producRoutes.get("/:id", getProductDetail);
producRoutes.post("/", createProduct);
producRoutes.patch("/:id", updateProduct);
producRoutes.delete("/:id", deleteProduct);


export default producRoutes;

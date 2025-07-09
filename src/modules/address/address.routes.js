import { Router } from "express";
import {
  createAddress,
  getAddressesByUser,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "./address.controller.js";

const addressRouter = Router();

addressRouter.post("/", createAddress);

addressRouter.get("/user/:userId", getAddressesByUser);

addressRouter.get("/:id", getAddressById);

addressRouter.put("/:id", updateAddress);

addressRouter.delete("/:id", deleteAddress);

export default addressRouter;

import express from "express";
import validator from "@middleware/validator";
import controller from "./product.controller";
import asyncHandler from "@middleware/async-handler";
import productSchema from "./validators";

const router = express.Router();

router
    .post("/", validator(productSchema), asyncHandler(controller.create))
    .get("/", asyncHandler(controller.getAll))
    .get("/:id", asyncHandler(controller.getById))
    .put("/:id", validator(productSchema), asyncHandler(controller.update))

export default router;


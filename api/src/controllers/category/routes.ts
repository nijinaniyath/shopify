import express from "express";
import validator from "@middleware/validator";
import controller from "./category";
import categorySchema from "./validators";
import asyncHandler from "@middleware/async-handler";
const router = express.Router();

router
    .post("/", validator(categorySchema), asyncHandler(controller.create))
    .get("/", asyncHandler(controller.getAll))
    .get("/:id", asyncHandler(controller.getById))

export default router;


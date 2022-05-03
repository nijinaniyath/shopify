import express from "express";
import asyncHandler from '@middleware/async-handler';
import auth from "@middleware/auth";
import validate from "@middleware/validator";
import schema from "./validators";
import controller from "./accounts.controller";

const router = express.Router();

router.post("", validate(schema), asyncHandler(controller.create));
router.post("/login", auth.local, asyncHandler(controller.login));

export default router;
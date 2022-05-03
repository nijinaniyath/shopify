import express from 'express';
import categoryRouter from "@controllers/category/routes";
import productRouter from "@controllers/product/routes";
import accountRouer from "@controllers/accounts/routes";
import auth from "@middleware/auth"

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/products", auth.jwt, productRouter);
router.use("/accounts", accountRouer);

export default router;


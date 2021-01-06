import { Router } from "express";

// Routes
import { auth } from "./auth.route";
import { order } from "./order.route";
import { product } from "./product.route";

const router = Router();

router.use("/auth", auth());
router.use("/product", product());
router.use("/order", order());

export default router;

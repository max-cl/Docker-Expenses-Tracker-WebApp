import { Router } from "express";

// Routes
import { auth } from "./auth.route";
import { expense } from "./expense.route";
import { dashboard } from "./dashboard.route";
import { app } from "./app.route";
import { budget } from "./budget.route";

const router = Router();

router.use("/auth", auth());
router.use("/expense", expense());
router.use("/dashboard", dashboard());
router.use("/app", app());
router.use("/budget", budget());

export default router;

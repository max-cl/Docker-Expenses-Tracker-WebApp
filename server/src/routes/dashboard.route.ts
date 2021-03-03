import { Router, Request, Response } from "express";

// Controllers
import { dashboardController } from "../controllers";

// Validator
import { middlewareValidatorParams } from "validator/middleware.validator";
import schemas from "../validator/schemas/dashboard.schema";

export const dashboard = () => {
    const router = Router();

    // // @route GET /dashboard
    // // @desc Dashboard /
    // // @access PUBLIC
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "success" });
    });

    // // @route GET /dashboard/:user_id
    // // @desc Get Dashboard Data
    // // @access PUBLIC
    router.get("/:user_id", middlewareValidatorParams(schemas.getDashboardData, "params"), dashboardController.getDashboardData);

    return router;
};

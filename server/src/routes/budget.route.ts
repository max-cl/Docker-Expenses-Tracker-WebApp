import { Router, Request, Response } from "express";

// Controllers
import { budgetController } from "../controllers";

// Validator
import { middlewareValidatorBody } from "validator/middleware.validator";
import schemas from "../validator/schemas/budget.schema";

export const budget = () => {
    const router = Router();

    // // @route GET /budget
    // // @desc Budget /
    // // @access PUBLIC
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "success" });
    });

    // // // @route POST /budget
    // // // @desc POST add Budget
    // // // @access PUBLIC
    router.post("/", middlewareValidatorBody(schemas.createBudget, "body"), budgetController.createBudget);

    return router;
};

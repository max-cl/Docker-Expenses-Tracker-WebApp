import { Router, Request, Response } from "express";

// Controllers
import { appController } from "../controllers";

// Validator
import { middlewareValidatorParams } from "validator/middleware.validator";
import schemas from "../validator/schemas/app.schema";

export const app = () => {
    const router = Router();

    // // @route GET /app
    // // @desc App /
    // // @access PUBLIC
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "success" });
    });

    // // @route GET /app/:user_id
    // // @desc Get App Data (categories)
    // // @access PUBLIC
    router.get("/:user_id", middlewareValidatorParams(schemas.getAppDAta, "params"), appController.getAppData);

    return router;
};

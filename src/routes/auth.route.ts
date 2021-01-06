import { Router, Request, Response } from "express";
import { authController } from "../controllers";
import { middlewareValidatorBody } from "validator/middleware.validator";
import schemas from "../validator/schemas/auth.schema";

export const auth = () => {
    const router = Router();

    // @route GET /auth
    // @desc Auth main route
    // @access PUBLIC
    router.get("/", (req: Request, res: Response) => {
        res.status(200).send("API");
    });

    // @route POST /auth/signup
    // @desc Signup an user
    // @access PUBLIC
    router.post("/signup", middlewareValidatorBody(schemas.signup, "body"), authController.signup);

    // @route POST /auth/signin
    // @desc Signin an user
    // @access PUBLIC
    router.post("/signin", middlewareValidatorBody(schemas.signin, "body"), authController.signin);

    // @route GET /auth/loaduser
    // @desc Load an user
    // @access PUBLIC
    router.get("/loaduser", authController.loaduser);

    return router;
};

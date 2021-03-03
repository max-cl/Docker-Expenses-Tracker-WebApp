import { Router, Request, Response } from "express";
import { authController } from "../controllers";
import { middlewareValidatorBody, middlewareValidatorParams } from "validator/middleware.validator";
import schemas from "../validator/schemas/auth.schema";

export const auth = () => {
    const router = Router();

    // @route GET /auth
    // @desc Auth main route
    // @access PUBLIC
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "success" });
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

    // @route PUT /auth/update
    // @desc Update an user information
    // @access PUBLIC
    router.put("/update", middlewareValidatorBody(schemas.updateUser, "body"), authController.updateUser);

    // @route POST /auth/forgotpassword
    // @desc Send Email with the Link to reset the user password
    // @access PUBLIC
    router.post("/forgotpassword", middlewareValidatorBody(schemas.forgotPassword, "body"), authController.forgotPassword);

    // @route GET /auth/resetpassword
    // @desc Check if the Token (link) is valid or has expired
    // @access PUBLIC
    router.get("/resetpassword/:resetpasswordtoken", middlewareValidatorParams(schemas.resetPassword, "params"), authController.resetPassword);

    // @route PUT /auth/updatepassword
    // @desc Update User Password
    // @access PUBLIC
    router.put("/updatepassword", middlewareValidatorBody(schemas.updatePassword, "body"), authController.updatePassword);

    return router;
};

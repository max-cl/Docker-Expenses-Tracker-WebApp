import { Request, Response, NextFunction } from "express";
import passport from "passport";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// Services
import { AuthService } from "services/auth.service";

// Interfaces
import { UserUpdate } from "interfaces/auth.interface";

// Utils
import { createToken } from "utils/tokens.util";
import { logger } from "utils/logger.util";
import { apiResponse, successResponse, failedResponse } from "utils/response";
import { encriptPassword } from "utils/encripter.util";

export class AuthController {
    constructor(private authService: AuthService) {}

    //SingUp using Passport
    public signup = (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        return passport.authenticate("register", (err, user, info) => {
            if (err) {
                logger.warn(err);
                return apiResponse(res, failedResponse(err), 500);
            }
            if (info !== undefined) {
                logger.warn(info.message);
                return apiResponse(res, failedResponse(info.message), 400);
            } else {
                logger.info(`User "${user.username}" created in db`);
                return apiResponse(res, successResponse({ message: `User ${user.username} has been created successfully` }), 201);
                // req.logIn(user, async () => {
                //     try {
                //         // HERE ADD CODE TO LOGIN AFTER THE USER WAS REGISTERED
                //         console.log(`User "${user.username}" created in db`);
                //         return apiResponse(res, successResponse(user), 201);
                //         // res.status(201).send({ message: `User: ${user.username} created in db` });
                //         // }
                //     } catch (error) {
                //         // console.log("Error: ", error);
                //         logger.error("error while register", { meta: { ...error } });
                //         // res.status(500).send({ message: `Error: ${error}` });
                //         return apiResponse(res, failedResponse(error), 500);
                //     }
                // });
            }
        })(req, res, next);
    };

    //SingIn using Passport
    public signin = (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        return passport.authenticate("login", (err, user, info) => {
            if (err) {
                logger.error(err);
                return apiResponse(res, failedResponse(err), 500);
            }
            if (info !== undefined) {
                console.error(info.message);
                if (info.message === "User not found") {
                    logger.warn(`${info.message}`);
                    return apiResponse(res, failedResponse(info.message), 404);
                } else {
                    logger.warn(info.message);
                    return apiResponse(res, failedResponse(info.message), 404);
                }
            } else {
                req.logIn(user, async () => {
                    const token = await createToken(user.user_id);
                    logger.info("User found & logged in");
                    return apiResponse(
                        res,
                        successResponse({
                            isAuthenticated: true,
                            token,
                            user: {
                                user_id: user.user_id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                username: user.username,
                                email: user.email,
                                phone: user.phone,
                                description: user.description,
                            },
                            message: "User found & logged in",
                        }),
                        200,
                    );
                });
            }
        })(req, res, next);
    };

    // LoadUser using Password
    public loaduser = (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        return passport.authenticate("jwt", { session: false }, (err, user, info) => {
            if (err) {
                logger.error(err);
                return apiResponse(res, failedResponse(err), 500);
            }
            if (info !== undefined) {
                logger.error(info.message);
                return apiResponse(res, failedResponse(info.message), 401);
            } else if (user) {
                logger.info("User found in db in passport");
                return apiResponse(
                    res,
                    successResponse({
                        isAuthenticated: true,
                        user: {
                            user_id: user.user_id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            username: user.username,
                            email: user.email,
                            phone: user.phone,
                            description: user.description,
                        },
                        message: "User found in db",
                    }),
                    200,
                );
            } else {
                logger.error("jwt id and username do not match");
                return apiResponse(res, failedResponse("Server error, please try again."), 403);
            }
        })(req, res, next);
    };

    // Update User Information
    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        return passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) {
                logger.error(err);
                return apiResponse(res, failedResponse(err), 500);
            }
            if (info !== undefined) {
                logger.error(info.message);
                return apiResponse(res, failedResponse(info.message), 401);
            } else if (parseInt(user.user_id, 10) === parseInt(req.body.user_id, 10)) {
                try {
                    const { user_id, first_name, last_name, username, email, phone, description } = <UserUpdate>req.body;
                    const userUpdated = await this.authService.updateUserInformation(user_id, first_name, last_name, username, email, parseInt(phone, 10), description);

                    if (userUpdated[0] === 1) {
                        logger.info(`User "${first_name} ${last_name}" was updated.`);
                        return apiResponse(res, successResponse({ message: `User "${first_name} ${last_name}" was updated successfully.` }), 200);
                    } else {
                        logger.warn(`User "${first_name} ${last_name}" was updated`);
                        return apiResponse(res, failedResponse({ message: `User "${first_name} ${last_name}" was updated` }), 404);
                    }
                } catch (error) {
                    logger.error("[Error] Update User information: ", { meta: { ...error } });
                    return apiResponse(res, failedResponse(error), 400);
                }
            } else {
                logger.error("username and jwt token do not match");
                return apiResponse(res, failedResponse("username and jwt token do not match"), 403);
            }
        })(req, res, next);
    };

    // Forgot Password
    public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;

            const userFound = await this.authService.getUserByEmail(email);

            if (userFound) {
                const token = crypto.randomBytes(20).toString("hex");
                const tokenResetPassword = await this.authService.createTokenForLinkToResetPassword(userFound.user_id, token);
                if (tokenResetPassword[0] === 1) {
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: `${process.env.EMAIL_ADDRESS}`,
                            pass: `${process.env.EMAIL_PASSWORD}`,
                        },
                    });

                    const mailOptions = {
                        from: "info@randomemail.dk",
                        to: `${userFound.email}`,
                        subject: "Link To Reset Password",
                        html:
                            "<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
                            "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
                            `<a href="${process.env.FORGOT_PASSWORD_LINK}/resetpassword/${token}">${process.env.FORGOT_PASSWORD_LINK}/resetpassword/${token}</a>\n\n` +
                            "If you did not request this, please ignore this email and your password will remain unchanged.</p>\n",
                    };

                    logger.info("sending mail...");

                    transporter.sendMail(mailOptions, (error, response) => {
                        if (error) console.error("Error sending email: ", error);
                        logger.info("Repsonse", { response });
                        return apiResponse(res, successResponse(`Email has been sent to you (${email}),for reseting your password`), 200);
                    });
                } else {
                    logger.error("Error trying to create the token for reseting password.");
                    return apiResponse(res, failedResponse("Error trying to create the token for reseting password."), 400);
                }
            } else {
                logger.error(`Email doesnt exist: ${email}`);
                return apiResponse(res, failedResponse("That email address is not recognized. Please try again or register for a new account."), 404);
            }
        } catch (error) {
            console.log(error);
            logger.error("Error trying to create the token for reseting password.", { meta: { ...error } });
            return apiResponse(res, failedResponse(error), 400);
        }
    };

    // Reset Password
    public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { resetpasswordtoken } = req.params;

            const userFound = await this.authService.getUserByResetPassword(resetpasswordtoken);
            console.log(" Reset Password userFound: ", userFound);

            if (userFound !== null) {
                logger.info("Password reset link a-ok");
                return apiResponse(
                    res,
                    successResponse({
                        username: userFound.username,
                        message: "Password reset link a-ok",
                    }),
                    200,
                );
            } else {
                logger.error("User doesn't exist or Password reset link is invalid or has expired.");
                return apiResponse(res, failedResponse("Password reset link is invalid or has expired."), 403);
            }
        } catch (error) {
            console.log(error);
            logger.error("Error trying to create the token for reseting password.", { meta: { ...error } });
            return apiResponse(res, failedResponse(error), 400);
        }
    };

    // Update Password
    public updatePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password, resetpasswordtoken } = req.body;
            const userFound = await this.authService.getUserByUsernameByResetToken(username, resetpasswordtoken);

            if (userFound !== null) {
                logger.info("User found in the DB");
                const hashedPassword = await encriptPassword(password);
                const passwordUpdated = await this.authService.updateUserPassword(userFound.user_id, hashedPassword);

                if (passwordUpdated[0] === 1) {
                    logger.info("Password has been updated");
                    return apiResponse(res, successResponse("Your password has been successfully updated, please try logging in again."), 200);
                } else {
                    logger.error("Error trying to create the token for reseting password.");
                    return apiResponse(res, failedResponse("Error trying to create the token for reseting password."), 400);
                }
            } else {
                logger.error("User does not exist in the DB or the token is valid / expired.");
                return apiResponse(res, failedResponse("Password reset link is invalid or has expired."), 403);
            }
        } catch (error) {
            console.log(error);
            logger.error("Error trying to update the password.", { meta: { ...error } });
            return apiResponse(res, failedResponse(error), 400);
        }
    };
}

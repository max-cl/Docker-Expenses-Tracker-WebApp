import { Request, Response, NextFunction } from "express";
import passport from "passport";

// Utils
import { createToken } from "utils/tokens.util";
import { logger } from "utils/logger.util";

export class AuthController {
    constructor() {}

    //SingUp using Passport
    public signup = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("register", (err, user, info) => {
            if (err) console.error(err);
            if (info !== undefined) {
                console.error(info.message);
                res.status(403).send(info.message);
            } else {
                req.logIn(user, async () => {
                    try {
                        // HERE ADD CODE TO LOGIN AFTER THE USER WAS REGISTERED
                        console.log(`User "${user.username}" created in db`);
                        res.status(200).send({ message: `User: ${user.username} created in db` });
                        // }
                    } catch (error) {
                        // console.log("Error: ", error);
                        logger.error("error while register", { meta: { ...error } });
                        res.status(500).send({ message: `Error: ${error}` });
                    }
                });
            }
        })(req, res, next);
    };

    //SingIn using Passport
    public signin = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("login", (err, user, info) => {
            if (err) {
                console.error(`error ${err}`);
            }
            if (info !== undefined) {
                console.error(info.message);
                if (info.message === "Bad username") {
                    res.status(401).send(info.message);
                } else {
                    res.status(403).send(info.message);
                }
            } else {
                req.logIn(user, async () => {
                    const token = await createToken(user.user_id);
                    console.log("User found & logged in");
                    res.status(200).send({
                        isAuthenticated: true,
                        token,
                        user: {
                            user_id: user.user_id,
                            fist_name: user.first_name,
                            last_name: user.last_name,
                            username: user.username,
                            email: user.email,
                            phone: user.phone,
                            description: user.description,
                        },
                        message: "User found & logged in",
                    });
                });
            }
        })(req, res, next);
    };

    // LoadUser using Password
    public loaduser = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (user) {
                res.status(200).json({
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
                });
                return;
            } else {
                console.error("jwt id and username do not match");
                res.status(403).send("Server error, please try again.");
                return;
            }
        })(req, res, next);
    };
}

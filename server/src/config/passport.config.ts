import { Request } from "express";
import Sequelize from "sequelize";
import passport from "passport";
import { Strategy } from "passport-local";
import { Strategy as StrategyJwt, ExtractJwt } from "passport-jwt";

// Utils
import accessEnv from "../utils/accessEnv";
import { logger } from "utils/logger.util";

// Models
import { db } from "models";

// Services
import { AuthService } from "services/auth.service";

// Interfaces
import { UserLogin, UserRegister } from "interfaces/auth.interface";
import { encriptPassword, isEqualsPassword } from "utils/encripter.util";

// ENV Variables
const jwtSecret = accessEnv("JWT_SECRET");

const LocalStrategy = Strategy;
const JWTstrategy = StrategyJwt;
const ExtractJWT = ExtractJwt;

const authService = new AuthService(db);

passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
            session: false,
        },
        async (req: Request, username: string, password: string, done) => {
            try {
                logger.info("SignUp...");
                const user = await authService.getUserByUsername(username);
                if (user != null) {
                    logger.warn(`the username ${username} already exists`);
                    return done(null, false, { message: `Username "${username}" already taken` });
                }
                const userInfo = <UserRegister>req.body;
                const hashedPassword = await encriptPassword(password);
                const data: UserRegister = {
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    description: userInfo.description,
                    username: userInfo.username,
                    password: hashedPassword,
                    roles: userInfo.roles,
                };

                const userCreated = await authService.createUser(data);
                const roles = await authService.getRoleByName(userInfo.roles);
                await userCreated.setRoles(roles);

                logger.info(`User ${userCreated.username} created`);
                return done(null, userCreated);
            } catch (error) {
                logger.error("Error while register", { meta: { ...error } });
                return done(error);
            }
        },
    ),
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            session: false,
        },
        async (username: string, password: string, done) => {
            try {
                const userInfo: UserLogin = { username, password };
                logger.info("SignIn...");
                const user = await authService.getUserByUsername(userInfo.username);
                if (user === null) {
                    logger.warn("User not found");
                    return done(null, false, { message: "User not found" });
                }
                const passwordChecked = await isEqualsPassword(userInfo.password, user.password);
                if (passwordChecked !== true) {
                    logger.warn("Passwords do not match");
                    return done(null, false, { message: "You’ve entered an invalid username or password" });
                }

                logger.info("User found & authenticated");
                return done(null, user);
            } catch (error) {
                logger.error("Error while login", { meta: { ...error } });
                done(error);
            }
        },
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwtSecret,
};

passport.use(
    "jwt",
    new JWTstrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await authService.getUserById(jwt_payload.user_id);
            if (user) {
                logger.info("User found in db in passport");
                done(null, user);
            } else {
                logger.info("User not found in db");
                done(null, false);
            }
        } catch (error) {
            logger.error("Error while token validation", { meta: { ...error } });
            done(error);
        }
    }),
);

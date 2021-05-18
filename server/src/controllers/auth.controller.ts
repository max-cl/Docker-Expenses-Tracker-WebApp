import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import crypto from 'crypto';

// Services
import { AuthService } from 'services/auth.service';

// Interfaces
import { UserUpdate } from 'interfaces/auth.interface';

// Utils
import { createToken } from 'utils/tokens.util';
import { logger } from 'utils/logger.util';
import { apiResponse, successResponse, failedResponse } from 'utils/response.util';
import { encriptPassword } from 'utils/encripter.util';
import { signUpPassportErrors, signInPassportErrors, JWTPassportErrors } from 'utils/passport-errors.util';
import { createTransporterEmail, sendMail, forgotPasswordMailOptions } from 'utils/send-mail.util';

export class AuthController {
    constructor(private authService: AuthService) {}

    public signup = (req: Request, res: Response, next: NextFunction): Promise<Response> =>
        passport.authenticate('register', (err, user, info) => {
            if (!signUpPassportErrors(res, err, info)) {
                return apiResponse(res, successResponse({ message: `User ${user.username} has been created successfully` }), 201);
            }
        })(req, res, next);

    public signin = (req: Request, res: Response, next: NextFunction): Promise<Response> =>
        passport.authenticate('login', (err, user, info) => {
            if (!signInPassportErrors(res, err, info)) {
                req.logIn(user, async () => {
                    const token = await createToken(user.user_id);
                    logger.info('User found & logged in');
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
                            },
                            message: 'User found & logged in',
                        }),
                        200
                    );
                });
            }
        })(req, res, next);

    public loaduser = (req: Request, res: Response, next: NextFunction): Promise<Response> =>
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (!JWTPassportErrors(res, err, info)) {
                if (user) {
                    logger.info('User found in db in passport');
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
                            },
                            message: 'User found in db',
                        }),
                        200
                    );
                }
                logger.error('username and jwt token do not match');
                return apiResponse(res, failedResponse('Server error, please try again.'), 403);
            }
        })(req, res, next);

    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> =>
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (!JWTPassportErrors(res, err, info)) {
                if (user.user_id === req.body.user_id) {
                    try {
                        const { user_id, first_name, last_name, username, email } = <UserUpdate>req.body;
                        const userUpdated = await this.authService.updateUserInformation(user_id, first_name, last_name, username, email);

                        if (userUpdated[0] === 1) {
                            logger.info(`Username "${username}" was updated.`);
                            return apiResponse(res, successResponse({ message: `Username "${username}" was updated successfully.` }), 200);
                        }
                        logger.warn(`Username "${username}" doesn't exist`);
                        return apiResponse(res, failedResponse({ message: `Username "${username}" doesn't exist` }), 404);
                    } catch (error) {
                        logger.error('[Error] Update User information: ', { meta: { ...error } });
                        return apiResponse(res, failedResponse(error), 400);
                    }
                }
                logger.error('username and jwt token do not match');
                return apiResponse(res, failedResponse('username and jwt token do not match'), 403);
            }
        })(req, res, next);

    public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            const userFound = await this.authService.getUserByEmail(email);

            if (userFound) {
                const token = crypto.randomBytes(20).toString('hex');
                const tokenResetPassword = await this.authService.createTokenForLinkToResetPassword(userFound.user_id, token);
                if (tokenResetPassword[0] === 1) {
                    logger.info('sending mail...');
                    const transporter = createTransporterEmail('gmail');
                    sendMail(transporter, forgotPasswordMailOptions(email, token), email, res);
                } else {
                    logger.error('Error trying to create the token for reseting password.');
                    return apiResponse(res, failedResponse('Error trying to create the token for reseting password.'), 400);
                }
            } else {
                logger.error(`Email doesnt exist: ${email}`);
                return apiResponse(res, failedResponse('Email is not recognized. Please try again or register for a new account.'), 404);
            }
        } catch (error) {
            logger.error('Error trying to create the token for reseting password.', { meta: { ...error } });
            return apiResponse(res, failedResponse(error), 400);
        }
    };

    public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { resetpasswordtoken } = req.params;
            const userFound = await this.authService.getUserByResetPassword(resetpasswordtoken);

            if (userFound) {
                logger.info('Password reset link a-ok');
                return apiResponse(res, successResponse({ username: userFound.username, message: 'Password reset link a-ok' }), 200);
            }
            logger.error("User doesn't exist or Password reset link is invalid or has expired.");
            return apiResponse(res, failedResponse('Password reset link is invalid or has expired.'), 403);
        } catch (error) {
            logger.error('Error trying to create the token for reseting password.', { meta: { ...error } });
            return apiResponse(res, failedResponse(error), 400);
        }
    };

    public updatePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password, resetpasswordtoken } = req.body;
            const userFound = await this.authService.getUserByUsernameByResetToken(username, resetpasswordtoken);

            if (userFound) {
                logger.info('User found in the DB');
                const hashedPassword = await encriptPassword(password);
                const passwordUpdated = await this.authService.updateUserPassword(userFound.user_id, hashedPassword);

                if (passwordUpdated[0] === 1) {
                    logger.info('Password has been updated');
                    return apiResponse(res, successResponse('Password has been successfully updated, please try logging in again.'), 200);
                }
                logger.error('Error trying to create the token for reseting password.');
                return apiResponse(res, failedResponse('Error trying to create the token for reseting password.'), 400);
            }
            logger.error('User does not exist in the DB or the token is valid / expired.');
            return apiResponse(res, failedResponse('Password reset link is invalid or has expired.'), 403);
        } catch (error) {
            logger.error('Error trying to update the password.', { meta: { ...error } });
            return apiResponse(res, failedResponse(error), 400);
        }
    };
}

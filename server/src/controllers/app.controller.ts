import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

// Services
import { AppService } from 'services/app.service';

// Utils
import { apiResponse, successResponse, failedResponse } from 'utils/response.util';
import { logger } from 'utils/logger.util';
import { JWTPassportErrors } from 'utils/passport-errors.util';

export class AppController {
    constructor(private appService: AppService) {}

    public getAppData = async (req: Request, res: Response, next: NextFunction): Promise<Response> =>
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (!JWTPassportErrors(res, err, info)) {
                if (user.user_id === parseInt(req.params.user_id)) {
                    try {
                        const expenseCategories = await this.appService.getExpenseCategories();

                        if (expenseCategories.length > 0) {
                            logger.info('Getting App Data');
                            return apiResponse(res, successResponse({ expenseCategories }), 200);
                        }
                        logger.warn('There is not app data for this user');
                        return apiResponse(res, failedResponse('There is not app data for this user'), 404);
                    } catch (error) {
                        logger.error('[Error] Get App Data: ', { meta: { ...error } });
                        return apiResponse(res, failedResponse(error), 400);
                    }
                }
                logger.error('username and jwt token do not match');
                return apiResponse(res, failedResponse('username and jwt token do not match'), 403);
            }
        })(req, res, next);
}

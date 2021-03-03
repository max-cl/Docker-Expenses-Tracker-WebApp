import { Request, Response, NextFunction } from "express";
import passport from "passport";

// Services
import { AppService } from "services/app.service";

// Utils
import { apiResponse, successResponse, failedResponse } from "utils/response";
import { logger } from "utils/logger.util";

export class AppController {
    constructor(private appService: AppService) {}

    public getAppData = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        return passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) {
                logger.error(err);
                return apiResponse(res, failedResponse(err), 500);
            }
            if (info !== undefined) {
                logger.error(info.message);
                return apiResponse(res, failedResponse(info.message), 401);
            } else if (parseInt(user.user_id, 10) === parseInt(req.params.user_id, 10)) {
                try {
                    const expenseCategories = await this.appService.getExpenseCategories();

                    const data = {
                        expenseCategories: expenseCategories,
                    };

                    if (Object.keys(data).length > 0) {
                        logger.info("Getting App Data");
                        return apiResponse(res, successResponse(data), 200);
                    } else {
                        logger.warn("There is not app data for this user");
                        return apiResponse(res, failedResponse("There is not app data for this user"), 404);
                    }
                } catch (error) {
                    logger.error("[Error] Get App Data: ", { meta: { ...error } });
                    return apiResponse(res, failedResponse(error), 400);
                }
            } else {
                logger.error("username and jwt token do not match");
                return apiResponse(res, failedResponse("username and jwt token do not match"), 403);
            }
        })(req, res, next);
    };
}

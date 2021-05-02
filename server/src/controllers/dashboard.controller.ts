import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

// Services
import { DashboardService } from 'services/dashboard.service';

// Utils
import { apiResponse, successResponse, failedResponse } from 'utils/response';
import { logger } from 'utils/logger.util';

export class DashboardController {
    constructor(private dashboardService: DashboardService) {}

    public getDashboardData = async (req: Request, res: Response, next: NextFunction): Promise<Response> =>
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) {
                logger.error(err);
                return apiResponse(res, failedResponse(err), 500);
            }
            if (info !== undefined) {
                logger.error(info.message);
                return apiResponse(res, failedResponse(info.message), 401);
            }
            if (parseInt(user.user_id) === parseInt(req.params.user_id)) {
                try {
                    const { user_id } = req.params;
                    const highestCategory = await this.dashboardService.getHighestCategory(parseInt(user_id));
                    const lowestCategory = await this.dashboardService.getLowestCategory(parseInt(user_id));
                    const totalToday = await this.dashboardService.getTotalToday(parseInt(user_id));
                    const mostSpending = await this.dashboardService.getMostSpending(parseInt(user_id));
                    const topFiveCategoriesYearly = await this.dashboardService.getTopFiveCategoriesYearly(parseInt(user_id));
                    const weeksOfTheYear = await this.dashboardService.getWeeksOfTheYear(parseInt(user_id));
                    const currentWeek = await this.dashboardService.getCurrentWeek(parseInt(user_id));
                    const totalMonthsYearly = await this.dashboardService.getTotalMonthsYearly(parseInt(user_id));
                    const currentMonthBudget = await this.dashboardService.getCurrentMonthBudget(parseInt(user_id));
                    const monthlyBudgets = await this.dashboardService.getMonthlyBudgets(parseInt(user_id));
                    const moneySaved = await this.dashboardService.getMoneySaved(parseInt(user_id));

                    const data = {
                        highestCategory: highestCategory[0],
                        lowestCategory: lowestCategory[0],
                        totalToday: totalToday[0],
                        mostSpending: mostSpending[0],
                        currentMonthBudget: currentMonthBudget[0],
                        moneySaved: moneySaved[0],
                        topFiveCategoriesYearly,
                        weeksOfTheYear,
                        currentWeek,
                        totalMonthsYearly,
                        monthlyBudgets,
                    };

                    if (Object.keys(data).length > 0) {
                        logger.info('Getting Dashboard Data');
                        return apiResponse(res, successResponse(data), 200);
                    }
                    logger.warn('There is not expenses for this user');
                    return apiResponse(res, failedResponse('There is not expenses for this user'), 404);
                } catch (error) {
                    logger.error('[Error] Get Dashboard Data: ', { meta: { ...error } });
                    return apiResponse(res, failedResponse(error), 400);
                }
            }
            logger.error('username and jwt token do not match');
            return apiResponse(res, failedResponse('username and jwt token do not match'), 403);
        })(req, res, next);
}

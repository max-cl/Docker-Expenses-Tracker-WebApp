import { Request, Response, NextFunction } from "express";
import passport from "passport";

// Services
import { ExpenseService } from "services/expense.service";

// Interfaces
import { ExpenseCreate, ExpenseUpdate } from "interfaces/expense.interface";

// Utils
import { apiResponse, successResponse, failedResponse } from "utils/response";
import { logger } from "utils/logger.util";

export class ExpenseController {
    constructor(private expenseService: ExpenseService) {}

    public getExpenses = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
                    const { user_id } = req.params;
                    const data = await this.expenseService.getAllExpenses(parseInt(user_id, 10));
                    if (data.length > 0) {
                        logger.info("Getting all EXPENSES");
                        return apiResponse(res, successResponse(data), 200);
                    } else {
                        logger.warn("There is not expenses for this user");
                        return apiResponse(res, failedResponse("There is not expenses for this user"), 404);
                    }
                } catch (error) {
                    logger.error("[Error] Get all expenses: ", { meta: { ...error } });
                    return apiResponse(res, failedResponse(error), 400);
                }
            } else {
                logger.error("username and jwt token do not match");
                return apiResponse(res, failedResponse("username and jwt token do not match"), 403);
            }
        })(req, res, next);
    };

    public createExpense = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
                    const { expense_name, amount, category_id, img_link, expense_date, user_id } = <ExpenseCreate>req.body;
                    await this.expenseService.createNewExpense(expense_name, amount, category_id, img_link, expense_date, user_id);
                    logger.info(`New Expense already added!`);
                    return apiResponse(res, successResponse({ message: "New expense has been added successfully" }), 201);
                } catch (error) {
                    logger.error("[Error] Create a new Expense: ", { meta: { ...error } });
                    return apiResponse(res, failedResponse(error), 400);
                }
            } else {
                logger.error("username and jwt token do not match");
                return apiResponse(res, failedResponse("username and jwt token do not match"), 403);
            }
        })(req, res, next);
    };

    public getExpenseById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
                    const { expense_id } = req.params;
                    const data = await this.expenseService.getExpenseById(parseInt(expense_id, 10));
                    if (data.length > 0) {
                        logger.info(`Get Expense ID: ${expense_id}`);
                        return apiResponse(res, successResponse(data), 200);
                    } else {
                        logger.warn("There is not data for this ID");
                        return apiResponse(res, failedResponse("There is not data for this ID"), 404);
                    }
                } catch (error) {
                    logger.error("[Error] Get Expense By ID: ", { meta: { ...error } });
                    return apiResponse(res, failedResponse(error), 400);
                }
            } else {
                logger.error("username and jwt token do not match");
                return apiResponse(res, failedResponse("username and jwt token do not match"), 403);
            }
        })(req, res, next);
    };

    public updateExpense = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
                    const { expense_id, category_id, expense_name, amount, img_link, expense_date } = <ExpenseUpdate>req.body;
                    const expenseUpdated = await this.expenseService.updateInfoExpense(expense_id, category_id, expense_name, amount, img_link, expense_date);

                    if (expenseUpdated[0] === 1) {
                        logger.info(`Expense (id: ${expense_id}) was updated.`);
                        return apiResponse(res, successResponse({ message: "Expense was updated successfully." }), 200);
                    } else {
                        logger.warn(`Expense (id: ${expense_id}) doesn't exist.`);
                        return apiResponse(res, failedResponse({ message: `Expense (id: ${expense_id}) doesn't exist.` }), 404);
                    }
                } catch (error) {
                    logger.error("[Error] Update Expense: ", { meta: { ...error } });
                    return apiResponse(res, failedResponse(error), 400);
                }
            } else {
                logger.error("username and jwt token do not match");
                return apiResponse(res, failedResponse("username and jwt token do not match"), 403);
            }
        })(req, res, next);
    };

    public deleteExpense = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
                    const { expense_id } = req.params;
                    const expenseDeleted = await this.expenseService.removeExpense(parseInt(expense_id, 10));
                    if (expenseDeleted === 1) {
                        logger.info(`Expense (id: ${expense_id}) deleted.`);
                        return apiResponse(res, successResponse({ message: "success" }), 200);
                    } else {
                        logger.warn(`Expense (id: ${expense_id}) doesn't exist.`);
                        return apiResponse(res, failedResponse({ message: `Expense (id: ${expense_id}) doesn't exist.` }), 404);
                    }
                } catch (error) {
                    logger.error("[Error] Delete Expense: ", { meta: { ...error } });
                    return apiResponse(res, failedResponse(error), 400);
                }
            } else {
                logger.error("username and jwt token do not match");
                return apiResponse(res, failedResponse("username and jwt token do not match"), 403);
            }
        })(req, res, next);
    };
}

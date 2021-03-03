import { Router, Request, Response } from "express";

// Controllers
import { expenseController } from "../controllers";

// Validator
import { middlewareValidatorBody, middlewareValidatorParams } from "validator/middleware.validator";
import schemas from "../validator/schemas/expense.schema";

export const expense = () => {
    const router = Router();

    // // @route GET /expense
    // // @desc Expense /
    // // @access PUBLIC
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "success" });
    });

    // // @route GET /expense/:user_id
    // // @desc Get all Expense
    // // @access PUBLIC
    router.get("/:user_id", middlewareValidatorParams(schemas.getAllExpenses, "params"), expenseController.getExpenses);

    // // @route POST /expense/create
    // // @desc POST create a new Expense
    // // @access PUBLIC
    router.post("/", middlewareValidatorBody(schemas.createExpense, "body"), expenseController.createExpense);

    // // @route GET /expense/:id
    // // @desc GET a Expense by ID
    // // @access PUBLIC
    router.get("/:user_id/:expense_id", middlewareValidatorParams(schemas.getExpenseById, "params"), expenseController.getExpenseById);

    // // @route PUT /expense/update
    // // @desc Update Expense info
    // // @access PUBLIC
    router.put("/", middlewareValidatorBody(schemas.updateExpense, "body"), expenseController.updateExpense);

    // // @route DELETE /expense/:user_id/:id
    // // @desc Delete a Expense
    // // @access PUBLIC
    router.delete("/:user_id/:expense_id", middlewareValidatorParams(schemas.deleteExpense, "params"), expenseController.deleteExpense);

    return router;
};

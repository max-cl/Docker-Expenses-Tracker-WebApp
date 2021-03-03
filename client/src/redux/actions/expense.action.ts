import {
    expense_id,
    Expense,
    ExpenseActionTypes,
    GET_EXPENSE_SUCCESS,
    REMOVE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_SUCCESS,
    CREATE_EXPENSE_SUCCESS,
    CLEAR_EXPENSE_STATES,
    CLEAR_EXPENSE_RESPONSE_SUCCESS,
} from "../types/expense";

// TypeScript infers that this function is returning ExpenseActionTypes

// Get all EXPENSES
export function getExpensesSuccess(expenses: Expense[]): ExpenseActionTypes {
    return {
        type: GET_EXPENSE_SUCCESS,
        expenses: expenses,
    };
}

// Remove EXPENSE
export function removeExpenseSuccess(expense_id: expense_id): ExpenseActionTypes {
    return {
        type: REMOVE_EXPENSE_SUCCESS,
        expense_id: expense_id,
    };
}

// Update EXPENSE
export function updateExpenseSuccess(expense: Expense, message: string, status: number): ExpenseActionTypes {
    return {
        type: UPDATE_EXPENSE_SUCCESS,
        expenseUpdated: { expense, message, status },
    };
}

// Add EXPENSE
export function createExpenseSuccess(expense: Expense, message: string, status: number): ExpenseActionTypes {
    return {
        type: CREATE_EXPENSE_SUCCESS,
        newExpense: { expense, message, status },
    };
}

export function cleanExpenseStatesSuccess(): ExpenseActionTypes {
    return {
        type: CLEAR_EXPENSE_STATES,
    };
}

export function cleanExpenseResponseSuccess(): ExpenseActionTypes {
    return {
        type: CLEAR_EXPENSE_RESPONSE_SUCCESS,
    };
}

import { BudgetActionTypes, CREATE_BUDGET_SUCCESS, CLEAR_BUDGET_STATES } from "../types/budget";

// Add EXPENSE
export function createBudgetSuccess(message: string, status: number): BudgetActionTypes {
    return {
        type: CREATE_BUDGET_SUCCESS,
        newBudget: { message, status },
    };
}

export function cleanBudgetStatesSuccess(): BudgetActionTypes {
    return {
        type: CLEAR_BUDGET_STATES,
    };
}

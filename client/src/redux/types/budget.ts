export const CREATE_BUDGET_REQUEST = "CREATE_BUDGET_REQUEST";
export const CREATE_BUDGET_SUCCESS = "CREATE_BUDGET_SUCCESS";
export const CREATE_BUDGET_FAILURE = "CREATE_BUDGET_FAILURE";

export const CLEAR_BUDGET_STATES = "CLEAR_BUDGET_STATES";

export interface BudgetState {
    message: string;
    status: number;
    loading: boolean;
    loaded: boolean;
}

export type expense_id = number;

interface CreateBudgetAction {
    type: typeof CREATE_BUDGET_REQUEST | typeof CREATE_BUDGET_SUCCESS | typeof CREATE_BUDGET_FAILURE;
    newBudget: { message: string; status: number };
}

interface CleanBudgetStatesAction {
    type: typeof CLEAR_BUDGET_STATES;
}

export type BudgetActionTypes = CreateBudgetAction | CleanBudgetStatesAction;

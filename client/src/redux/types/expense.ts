export const GET_EXPENSE_REQUEST = "GET_EXPENSE_REQUEST";
export const GET_EXPENSE_SUCCESS = "GET_EXPENSE_SUCCESS";
export const GET_EXPENSE_FAILURE = "GET_EXPENSE_FAILURE";

export const REMOVE_EXPENSE_REQUEST = "REMOVE_EXPENSE_REQUEST";
export const REMOVE_EXPENSE_SUCCESS = "REMOVE_EXPENSE_SUCCESS";
export const REMOVE_EXPENSE_FAILURE = "REMOVE_EXPENSE_FAILURE";

export const UPDATE_EXPENSE_REQUEST = "UPDATE_EXPENSE_REQUEST";
export const UPDATE_EXPENSE_SUCCESS = "UPDATE_EXPENSE_SUCCESS";
export const UPDATE_EXPENSE_FAILURE = "UPDATE_EXPENSE_FAILURE";

export const CREATE_EXPENSE_REQUEST = "CREATE_EXPENSE_REQUEST";
export const CREATE_EXPENSE_SUCCESS = "CREATE_EXPENSE_SUCCESS";
export const CREATE_EXPENSE_FAILURE = "CREATE_EXPENSE_FAILURE";

export const CLEAR_EXPENSE_STATES = "CLEAR_EXPENSE_STATES";
export const CLEAR_EXPENSE_RESPONSE_SUCCESS = "CLEAR_EXPENSE_RESPONSE_SUCCESS";

export interface Expense {
    expense_id: number;
    expense_name: string;
    category_id: number;
    expense_date: Date | null;
    amount: number;
    img_link: string;
}

export interface ExpenseState {
    expenses: Expense[];
    message: string;
    status: number;
    loading: boolean;
    loaded: boolean;
}

export type expense_id = number;

interface GetExpensesAction {
    type: typeof GET_EXPENSE_REQUEST | typeof GET_EXPENSE_SUCCESS | typeof GET_EXPENSE_FAILURE;
    expenses: Expense[];
}

interface RemoveExpenseAction {
    type: typeof REMOVE_EXPENSE_REQUEST | typeof REMOVE_EXPENSE_SUCCESS | typeof REMOVE_EXPENSE_FAILURE;
    expense_id: expense_id;
}

interface UpdateExpenseAction {
    type: typeof UPDATE_EXPENSE_REQUEST | typeof UPDATE_EXPENSE_SUCCESS | typeof UPDATE_EXPENSE_FAILURE;
    expenseUpdated: { expense: Expense; message: string; status: number };
}

interface CreateExpenseAction {
    type: typeof CREATE_EXPENSE_REQUEST | typeof CREATE_EXPENSE_SUCCESS | typeof CREATE_EXPENSE_FAILURE;
    newExpense: { expense: Expense; message: string; status: number };
}

interface CleanExpenseStatesAction {
    type: typeof CLEAR_EXPENSE_STATES;
}

interface CleanExpenseResponseSuccessAction {
    type: typeof CLEAR_EXPENSE_RESPONSE_SUCCESS;
}

export type ExpenseActionTypes =
    | GetExpensesAction
    | RemoveExpenseAction
    | UpdateExpenseAction
    | CreateExpenseAction
    | CleanExpenseStatesAction
    | CleanExpenseResponseSuccessAction;

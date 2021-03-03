import {
    ExpenseState,
    ExpenseActionTypes,
    GET_EXPENSE_REQUEST,
    GET_EXPENSE_SUCCESS,
    GET_EXPENSE_FAILURE,
    REMOVE_EXPENSE_REQUEST,
    REMOVE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_REQUEST,
    UPDATE_EXPENSE_SUCCESS,
    CREATE_EXPENSE_REQUEST,
    CREATE_EXPENSE_SUCCESS,
    CLEAR_EXPENSE_STATES,
    CLEAR_EXPENSE_RESPONSE_SUCCESS,
} from "../types/expense";

const initialState: ExpenseState = {
    expenses: [],
    message: "",
    status: 0,
    loading: false,
    loaded: false,
};

const expenseState = (state = initialState, action: ExpenseActionTypes): ExpenseState => {
    switch (action.type) {
        case CREATE_EXPENSE_REQUEST:
        case UPDATE_EXPENSE_REQUEST:
        case REMOVE_EXPENSE_REQUEST:
        case GET_EXPENSE_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
            };

        case GET_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: action.expenses,
                loading: false,
                loaded: true,
            };

        case REMOVE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: state.expenses.filter((f) => f.expense_id !== action.expense_id),
                loading: false,
                loaded: true,
            };

        case UPDATE_EXPENSE_SUCCESS:
            const index = state.expenses.findIndex((expense) => expense.expense_id === action.expenseUpdated.expense.expense_id);
            const newExpense = [...state.expenses];
            newExpense[index].expense_name = action.expenseUpdated.expense.expense_name;
            newExpense[index].category_id = action.expenseUpdated.expense.category_id;
            newExpense[index].amount = action.expenseUpdated.expense.amount;
            newExpense[index].expense_date = action.expenseUpdated.expense.expense_date;
            newExpense[index].img_link = action.expenseUpdated.expense.img_link;
            return {
                ...state,
                expenses: newExpense,
                message: action.expenseUpdated.message,
                status: action.expenseUpdated.status,
                loading: false,
                loaded: true,
            };

        case CREATE_EXPENSE_SUCCESS:
            return {
                ...state,
                expenses: [...state.expenses, action.newExpense.expense],
                message: action.newExpense.message,
                status: action.newExpense.status,
                loading: false,
                loaded: true,
            };

        case CLEAR_EXPENSE_STATES:
        case GET_EXPENSE_FAILURE:
            return {
                ...state,
                expenses: [],
                message: "",
                status: 0,
                loading: false,
                loaded: false,
            };

        case CLEAR_EXPENSE_RESPONSE_SUCCESS:
            return {
                ...state,
                message: "",
                status: 0,
            };

        default:
            return state;
    }
};

export default expenseState;

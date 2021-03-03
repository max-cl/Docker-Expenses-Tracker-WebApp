import { Action } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from "axios";

// Action
import { returnErrors, clearErrors, returnErrorsInputFields } from "../thunks/error.thunk";

// Types
import {
    Expense,
    GET_EXPENSE_REQUEST,
    GET_EXPENSE_FAILURE,
    REMOVE_EXPENSE_REQUEST,
    REMOVE_EXPENSE_FAILURE,
    UPDATE_EXPENSE_REQUEST,
    UPDATE_EXPENSE_FAILURE,
    CREATE_EXPENSE_REQUEST,
    CREATE_EXPENSE_FAILURE,
} from "../types/expense";
import { LOGOUT_SUCCESS } from "../types/auth";

// Actions
import {
    getExpensesSuccess,
    removeExpenseSuccess,
    updateExpenseSuccess,
    createExpenseSuccess,
    cleanExpenseStatesSuccess,
} from "../actions/expense.action";

// APIs
import { GET_EXPENSES, REMOVE_EXPENSE, UPDATE_EXPENSE, CREATE_EXPENSE } from "../apis";

// Utils
import { tokenConfig } from "../../utils";

export const getExpenses = (user_id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(clearErrors());
    dispatch({ type: GET_EXPENSE_REQUEST });
    try {
        const response = await axios.get<AxiosResponse>(`${GET_EXPENSES}/${user_id}`, tokenConfig(getState));
        const expenses: Expense[] = response.data.data;
        dispatch(getExpensesSuccess(expenses));
    } catch (error) {
        let errorStatus, errorMessage;
        if (error.response.status === 401 && error.response.data.data === "jwt expired") {
            errorMessage = "Session has expired";
            errorStatus = error.status;
            dispatch(returnErrors(errorMessage, errorStatus, GET_EXPENSE_FAILURE));
            dispatch({ type: LOGOUT_SUCCESS });
        }
        if (error.response === undefined) {
            // network error
            errorStatus = 500;
            errorMessage = "Error: Network Error (Server is not running!)";
            dispatch(returnErrors(errorMessage, errorStatus, GET_EXPENSE_FAILURE));
        } else {
            // input fields error
            errorStatus = error.response.status;
            if (!error.response.data.success && error.response.data.errors) {
                dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, GET_EXPENSE_FAILURE));
            } else if (error.response.data.message === undefined) {
                errorMessage = error.response.data.data;
                dispatch(returnErrors(errorMessage, errorStatus, GET_EXPENSE_FAILURE));
            }
        }

        dispatch({ type: GET_EXPENSE_FAILURE });
    }
};

export const removeExpense = (id_user: number, expense_id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
    getState,
) => {
    dispatch(clearErrors());
    dispatch({ type: REMOVE_EXPENSE_REQUEST });
    try {
        await axios.delete<AxiosResponse>(`${REMOVE_EXPENSE}/${id_user}/${expense_id}`, tokenConfig(getState));
        dispatch(removeExpenseSuccess(expense_id));
    } catch (error) {
        let errorStatus, errorMessage;
        if (error.response === undefined) {
            // network error
            errorStatus = 500;
            errorMessage = "Error: Network Error (Server is not running!)";
            dispatch(returnErrors(errorMessage, errorStatus, REMOVE_EXPENSE_FAILURE));
        } else {
            // input fields error
            errorStatus = error.response.status;
            if (!error.response.data.success && error.response.data.errors) {
                dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, REMOVE_EXPENSE_FAILURE));
            } else if (error.response.data.message === undefined) {
                errorMessage = error.response.data.data;
                dispatch(returnErrors(errorMessage, errorStatus, REMOVE_EXPENSE_FAILURE));
            }
        }

        dispatch({ type: REMOVE_EXPENSE_FAILURE });
    }
};

export const updateExpense = (
    user_id: number,
    expense_id: number,
    expense_name: string,
    category_id: number,
    amount: number,
    expense_date: Date | null,
    img_link: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(clearErrors());
    dispatch({ type: UPDATE_EXPENSE_REQUEST });
    try {
        const response = await axios.put<AxiosResponse>(
            `${UPDATE_EXPENSE}`,
            {
                user_id,
                expense_id,
                expense_name,
                category_id,
                amount,
                expense_date,
                img_link,
            },
            tokenConfig(getState),
        );
        const expenseUpdated = { expense_id, expense_name, category_id, amount, expense_date, img_link };
        dispatch(updateExpenseSuccess(expenseUpdated, response.data.data.message, response.status));
    } catch (error) {
        let errorStatus, errorMessage;
        if (error.response === undefined) {
            // network error
            errorStatus = 500;
            errorMessage = "Error: Network Error (Server is not running!)";
            dispatch(returnErrors(errorMessage, errorStatus, UPDATE_EXPENSE_FAILURE));
        } else {
            // input fields error
            errorStatus = error.response.status;
            if (!error.response.data.success && error.response.data.errors) {
                dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, UPDATE_EXPENSE_FAILURE));
            } else if (error.response.data.message === undefined) {
                errorMessage = error.response.data.data;
                dispatch(returnErrors(errorMessage, errorStatus, UPDATE_EXPENSE_FAILURE));
            }
        }

        dispatch({ type: UPDATE_EXPENSE_FAILURE });
    }
};

export const createExpense = (
    user_id: number,
    expense_name: string,
    category_id: number,
    amount: number,
    expense_date: Date | null,
    img_link: string,
    expense_id: number,
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(clearErrors());
    dispatch({ type: CREATE_EXPENSE_REQUEST });
    try {
        const response = await axios.post<AxiosResponse>(
            `${CREATE_EXPENSE}`,
            {
                user_id,
                expense_name,
                category_id,
                amount,
                expense_date,
                img_link,
            },
            tokenConfig(getState),
        );
        const newExpense = { expense_id, expense_name, category_id, amount, expense_date, img_link };
        dispatch(createExpenseSuccess(newExpense, response.data.data.message, response.status));
    } catch (error) {
        let errorStatus, errorMessage;
        if (error.response === undefined) {
            // network error
            errorStatus = 500;
            errorMessage = "Error: Network Error (Server is not running!)";
            dispatch(returnErrors(errorMessage, errorStatus, CREATE_EXPENSE_FAILURE));
        } else {
            // input fields error
            errorStatus = error.response.status;
            if (!error.response.data.success && error.response.data.errors) {
                dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, CREATE_EXPENSE_FAILURE));
            } else if (error.response.data.message === undefined) {
                errorMessage = error.response.data.data;
                dispatch(returnErrors(errorMessage, errorStatus, CREATE_EXPENSE_FAILURE));
            }
        }

        dispatch({ type: CREATE_EXPENSE_FAILURE });
    }
};

export const cleanExpenseStates = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(cleanExpenseStatesSuccess());
};

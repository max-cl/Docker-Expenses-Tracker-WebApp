import { Action } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from "axios";

// Action
import { returnErrors, clearErrors, returnErrorsInputFields } from "./error.thunk";
import { loginSuccess, logoutSuccess, loadUserSuccess, updateUserInformationSuccess } from "../actions/auth.action";
import { cleanExpenseStates } from "./expenses.thunk";
import { cleanDashboardStates } from "./dashboard.thunk";

// Types
import {
    IAuth,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_FAILURE,
    UPDATE_USER_INFORMATION_REQUEST,
    UPDATE_USER_INFORMATION_FAILURE,
} from "../types/auth";

// APIs
import { URL_LOGIN, URL_LOAD_USER, URL_UPDATE_USER } from "../apis";

// Utils
import { tokenConfig } from "../../utils";

export const login = (username: string, password: string, history: any): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    // Headers
    const config = { headers: { "Content-Type": "application/json" } };
    // Request body
    const body = JSON.stringify({ username, password });
    dispatch(clearErrors());
    dispatch({ type: LOGIN_REQUEST });
    try {
        const loginInfo = await axios.post<AxiosResponse>(`${URL_LOGIN}`, body, config);
        dispatch(loginSuccess(loginInfo.data.data));
        history.push("/app/dashboard");
    } catch (error) {
        let errorStatus, errorMessage;
        if (error.response === undefined) {
            // network error
            errorStatus = 500;
            errorMessage = "Error: Network Error (Server is not running!)";
            dispatch(returnErrors(errorMessage, errorStatus, LOGIN_FAILURE));
        } else {
            // input fields error
            errorStatus = error.response.status;
            if (!error.response.data.success && error.response.data.errors) {
                dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, LOGIN_FAILURE));
            } else if (error.response.data.message === undefined) {
                // server errors (User not found, Password not match, etc.)
                errorMessage = error.response.data.data;
                dispatch(returnErrors(errorMessage, errorStatus, LOGIN_FAILURE));
            }
        }

        dispatch({ type: LOGIN_FAILURE });
    }
};

export const logout = (history: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(clearErrors());
    dispatch(cleanExpenseStates());
    dispatch(cleanDashboardStates());
    dispatch(logoutSuccess());
    history.push("/login");
};

export const loadUser = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(clearErrors());
    dispatch({ type: LOAD_USER_REQUEST });
    try {
        const response = await axios.get<AxiosResponse>(`${URL_LOAD_USER}`, tokenConfig(getState));
        const userLoaded: IAuth = response.data.data;
        dispatch(loadUserSuccess(userLoaded));
    } catch (error) {
        let errorStatus, errorMessage;
        if (error.response === undefined) {
            // network error
            errorStatus = 500;
            errorMessage = "Error: Network Error (Server is not running!)";
            dispatch(returnErrors(errorMessage, errorStatus, LOAD_USER_FAILURE));
        } else {
            if (error.response.data.message === undefined) {
                // server errors (No auth token)
                errorMessage = error.response.data.data;
                errorStatus = error.response.status;
                dispatch(returnErrors(errorMessage, errorStatus, LOAD_USER_FAILURE));
            }
        }
        dispatch(clearErrors());
        dispatch(cleanExpenseStates());
        dispatch(cleanDashboardStates());
        dispatch({ type: LOAD_USER_FAILURE });
    }
};

export const updateUserInformation = (
    user_id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    description: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(clearErrors());
    dispatch({ type: UPDATE_USER_INFORMATION_REQUEST });
    try {
        const response = await axios.put<AxiosResponse>(
            `${URL_UPDATE_USER}`,
            {
                user_id,
                first_name,
                last_name,
                username,
                email,
                phone,
                description,
            },
            tokenConfig(getState),
        );

        const userInfo = {
            user_id,
            username,
            first_name,
            last_name,
            email,
            phone,
            description,
        };

        dispatch(updateUserInformationSuccess(userInfo, response.data.data.message, response.status));
    } catch (error) {
        let errorStatus, errorMessage;
        if (error.response === undefined) {
            // network error
            errorStatus = 500;
            errorMessage = "Error: Network Error (Server is not running!)";
            dispatch(returnErrors(errorMessage, errorStatus, UPDATE_USER_INFORMATION_FAILURE));
        } else {
            // input fields error
            errorStatus = error.response.status;
            if (!error.response.data.success && error.response.data.errors) {
                dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, UPDATE_USER_INFORMATION_FAILURE));
            } else if (error.response.data.message === undefined) {
                errorMessage = error.response.data.data;
                dispatch(returnErrors(errorMessage, errorStatus, UPDATE_USER_INFORMATION_FAILURE));
            }
        }

        dispatch({ type: UPDATE_USER_INFORMATION_FAILURE });
    }
};

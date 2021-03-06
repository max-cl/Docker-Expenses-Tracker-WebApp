import { Action } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from "axios";

// Action
import { clearErrors } from "./error.thunk";
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
import { tokenConfig, errorManagment } from "../../utils";

export const login =
    (username: string, password: string, history: any): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
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
            errorManagment(error, dispatch, LOGIN_FAILURE);
        }
    };

export const logout =
    (history: any): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
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
        errorManagment(error, dispatch, LOAD_USER_FAILURE);
        dispatch(clearErrors());
        dispatch(cleanExpenseStates());
        dispatch(cleanDashboardStates());
    }
};

export const updateUserInformation =
    (
        user_id: number,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
    ): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
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
                },
                tokenConfig(getState),
            );

            const userInfo = {
                user_id,
                username,
                first_name,
                last_name,
                email,
            };

            dispatch(updateUserInformationSuccess(userInfo, response.data.data.message, response.status));
        } catch (error) {
            errorManagment(error, dispatch, UPDATE_USER_INFORMATION_FAILURE);
        }
    };

import { Action } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from "axios";

// Actions
import { getDashboardDataSuccess, cleanDashboardStatesSuccess } from "../actions/dashboard.action";

// Thunks
import { clearErrors } from "./error.thunk";

// Types
import { GET_DASHBOARD_REQUEST, GET_DASHBOARD_FAILURE } from "../types/dashboard";

// APIs
import { GET_DASHBOARD } from "../apis";

// Utils
import { tokenConfig, errorManagment } from "../../utils";

export const getDashboardData =
    (user_id: number): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
        dispatch(clearErrors());
        dispatch({ type: GET_DASHBOARD_REQUEST });
        try {
            const dashboardData = await axios.get<AxiosResponse>(`${GET_DASHBOARD}/${user_id}`, tokenConfig(getState));
            dispatch(getDashboardDataSuccess(dashboardData.data.data));
        } catch (error) {
            errorManagment(error, dispatch, GET_DASHBOARD_FAILURE);
        }
    };

export const cleanDashboardStates = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(cleanDashboardStatesSuccess());
};

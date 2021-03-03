import { Action } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from "axios";

// Actions
import { getAppDataSuccess, cleanAppStatesSuccess } from "../actions/app.actions";

// Thunks
import { clearErrors, returnErrors } from "./error.thunk";

// Types
import { GET_APP_REQUEST, GET_APP_FAILURE } from "../types/app";

// APIs
import { GET_APP } from "../apis";

// Utils
import { tokenConfig } from "../../utils";

export const getAppData = (user_id: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(clearErrors());
    dispatch({ type: GET_APP_REQUEST });
    try {
        const appData = await axios.get<AxiosResponse>(`${GET_APP}/${user_id}`, tokenConfig(getState));
        dispatch(getAppDataSuccess(appData.data.data));
    } catch (error) {
        console.log("ERROR => App data action: ", { error });
        let errorMessage, errorStatus;
        if (error.response.status === 401 && error.response.data.data === "jwt expired") {
            errorMessage = "Session has expired";
            errorStatus = error.status;
            dispatch(returnErrors(errorMessage, errorStatus, GET_APP_FAILURE));
        }
    }
};

// Clean App States ( categories expenses )
export const cleanAppStates = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(cleanAppStatesSuccess());
};

// Actions Types
import { GET_APP_SUCCESS, CLEAR_APP_STATES, IAppData, AppActionTypes } from "../types/app";

// Get App Data
export const getAppDataSuccess = (appData: IAppData): AppActionTypes => {
    return {
        type: GET_APP_SUCCESS,
        appData: appData,
    };
};

export const cleanAppStatesSuccess = (): AppActionTypes => {
    return {
        type: CLEAR_APP_STATES,
    };
};

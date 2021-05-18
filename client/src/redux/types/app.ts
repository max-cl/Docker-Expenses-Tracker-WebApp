export const GET_APP_REQUEST = 'GET_APP_REQUEST';
export const GET_APP_SUCCESS = 'GET_APP_SUCCESS';
export const GET_APP_FAILURE = 'GET_APP_FAILURE';
export const CLEAR_APP_STATES = 'CLEAR_APP_STATES';

export interface IAppData {
    expenseCategories: {}[];
}

export interface AppState {
    appData: IAppData;
    loading: boolean;
    loaded: boolean;
}

interface GetAppDataAction {
    type: typeof GET_APP_REQUEST | typeof GET_APP_SUCCESS | typeof GET_APP_FAILURE;
    appData: IAppData;
}

interface cleanAppStatesAction {
    type: typeof CLEAR_APP_STATES;
}

export type AppActionTypes = GetAppDataAction | cleanAppStatesAction;

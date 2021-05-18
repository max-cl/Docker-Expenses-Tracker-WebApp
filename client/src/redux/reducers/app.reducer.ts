import { GET_APP_REQUEST, GET_APP_SUCCESS, CLEAR_APP_STATES, AppActionTypes, AppState, IAppData } from '../types/app';

const initialState: AppState = {
    appData: {} as IAppData,
    loading: false,
    loaded: false,
};

const appState = (state = initialState, action: AppActionTypes): AppState => {
    switch (action.type) {
        case GET_APP_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
            };

        case GET_APP_SUCCESS:
            return {
                ...state,
                appData: action.appData,
                loading: false,
                loaded: true,
            };

        case CLEAR_APP_STATES:
            return {
                ...state,
                appData: {} as IAppData,
                loading: false,
                loaded: false,
            };

        default:
            return state;
    }
};

export default appState;

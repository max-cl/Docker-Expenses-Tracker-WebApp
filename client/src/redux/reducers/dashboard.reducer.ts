import {
    GET_DASHBOARD_REQUEST,
    GET_DASHBOARD_SUCCESS,
    GET_DASHBOARD_FAILURE,
    CLEAR_DASHBOARD_STATES,
    DashboardActionTypes,
    DashboardState,
    IDashboardData,
} from "../types/dashboard";

const initialState: DashboardState = {
    dashboardData: {} as IDashboardData,
    loading: false,
    loaded: false,
};

const dashboardState = (state = initialState, action: DashboardActionTypes): DashboardState => {
    switch (action.type) {
        case GET_DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
            };

        case GET_DASHBOARD_SUCCESS:
            return {
                ...state,
                dashboardData: action.dashboardData,
                loading: false,
                loaded: true,
            };

        case CLEAR_DASHBOARD_STATES:
        case GET_DASHBOARD_FAILURE:
            return {
                ...state,
                dashboardData: {} as IDashboardData,
                loading: false,
                loaded: false,
            };

        default:
            return state;
    }
};

export default dashboardState;

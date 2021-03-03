// Types
import { IDashboardData, DashboardActionTypes, GET_DASHBOARD_SUCCESS, CLEAR_DASHBOARD_STATES } from "../types/dashboard";

// Get Dashboard Data
export function getDashboardDataSuccess(dashboardData: IDashboardData): DashboardActionTypes {
    return {
        type: GET_DASHBOARD_SUCCESS,
        dashboardData: dashboardData,
    };
}

export const cleanDashboardStatesSuccess = (): DashboardActionTypes => {
    return {
        type: CLEAR_DASHBOARD_STATES,
    };
};

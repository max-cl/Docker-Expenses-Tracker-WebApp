export const GET_DASHBOARD_REQUEST = "GET_DASHBOARD_REQUEST";
export const GET_DASHBOARD_SUCCESS = "GET_DASHBOARD_SUCCESS";
export const GET_DASHBOARD_FAILURE = "GET_DASHBOARD_FAILURE";
export const CLEAR_DASHBOARD_STATES = "CLEAR_DASHBOARD_STATES";

export interface IDashboardData {
    highestCategory: { amount: number; title: string; description: string; imgpath: string };
    lowestCategory: { amount: number; title: string; description: string; imgpath: string };
    totalToday: { amount: number; title: string; description: string; imgpath: string };
    mostSpending: { amount: number; title: string; description: string; imgpath: string };
    currentMonthBudget: { amount: number; title: string; description: string; imgpath: string };
    moneySaved: { amount: number; title: string; description: string; imgpath: string };
    topFiveCategoriesYearly: { labels: string[]; value: number[]; title: string; label: string };
    monthlyBudgets: { labels: string[]; value: number[]; title: string; label: string };
    weeksOfTheYear: { labels: string[]; value: number[]; title: string; label: string };
    totalMonthsYearly: { labels: string[]; value: number[]; title: string; label: string };
    currentWeek: { labels: string[]; value: number[]; title: string; label: string };
}

export interface DashboardState {
    dashboardData: IDashboardData;
    loading: boolean;
    loaded: boolean;
}

interface GetDashboardDataAction {
    type: typeof GET_DASHBOARD_REQUEST | typeof GET_DASHBOARD_SUCCESS | typeof GET_DASHBOARD_FAILURE;
    dashboardData: IDashboardData;
}

interface cleanDashboardStatesAction {
    type: typeof CLEAR_DASHBOARD_STATES;
}

export type DashboardActionTypes = GetDashboardDataAction | cleanDashboardStatesAction;

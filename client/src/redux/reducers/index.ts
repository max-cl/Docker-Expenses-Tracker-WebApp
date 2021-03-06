import { combineReducers } from "redux";
import authStore from "./auth.reducer";
import errorStore from "./error.reducer";
import expenseStore from "./expense.reducer";
import dashboardStore from "./dashboard.reducer";
import appStore from "./app.reducer";
import budgetStore from "./budget.reducer";

const reducers = {
    auth: authStore,
    error: errorStore,
    expense: expenseStore,
    dashboard: dashboardStore,
    app: appStore,
    budget: budgetStore,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

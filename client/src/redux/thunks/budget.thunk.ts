import { Action } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosResponse } from "axios";

// Action
// Actions
import { createBudgetSuccess, cleanBudgetStatesSuccess } from "../actions/budget.action";
import { clearErrors } from "../thunks/error.thunk";

// Types
import { CREATE_BUDGET_REQUEST, CREATE_BUDGET_FAILURE } from "../types/budget";

// APIs
import { URL_ADD_BUDGET } from "../apis";

// Utils
import { tokenConfig, errorManagment } from "../../utils";

export const createBudget =
    (amount: number, budget_date: Date | null, user_id: number): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
        dispatch(clearErrors());
        dispatch({ type: CREATE_BUDGET_REQUEST });
        try {
            const response = await axios.post<AxiosResponse>(
                `${URL_ADD_BUDGET}`,
                {
                    user_id,
                    amount,
                    budget_date,
                },
                tokenConfig(getState),
            );

            dispatch(createBudgetSuccess(response.data.data.message, response.status));
        } catch (error) {
            errorManagment(error, dispatch, CREATE_BUDGET_FAILURE);
        }
    };

export const cleanBudgetStates = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(cleanBudgetStatesSuccess());
};

import { Action } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";

// Actions
import { returnErrorSuccess, returnErrorsInputFieldsSuccess, clearErrorsSuccess } from "../actions/error.action";

// Types
import { IInputFields } from "../types/error";

// RETURN ERRORS
export const returnErrors = (message: string, status: number, id: string): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
) => {
    dispatch(returnErrorSuccess(message, status, id));
};

// RETURN ERRORS INPUT FIELDS
export const returnErrorsInputFields = (
    inputFields: IInputFields,
    status: number,
    id: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(returnErrorsInputFieldsSuccess(inputFields, status, id));
};

// CLEAR ERRORS
export const clearErrors = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(clearErrorsSuccess());
};

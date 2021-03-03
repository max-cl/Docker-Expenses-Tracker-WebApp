export const GET_ERRORS = "GET_ERRORS";
export const GET_ERRORS_INPUTFIELDS = "GET_ERRORS_INPUTFIELDS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export interface IInputFields {}

export interface ErrorState {
    inputFields: IInputFields;
    message: string;
    status: number;
    id: string;
}

interface returnErrorsAction {
    type: typeof GET_ERRORS;
    error: { message: string; status: number; id: string };
}

interface returnErrorsInputFieldsAction {
    type: typeof GET_ERRORS_INPUTFIELDS;
    inputError: { inputFields: IInputFields; status: number; id: string };
}

interface clearErrorsAction {
    type: typeof CLEAR_ERRORS;
}

export type ErrorActionTypes = returnErrorsAction | returnErrorsInputFieldsAction | clearErrorsAction;

import { IInputFields, ErrorActionTypes, GET_ERRORS, CLEAR_ERRORS, GET_ERRORS_INPUTFIELDS } from "../types/error";

// RETURN ERRORS
export const returnErrorSuccess = (message: string, status: number, id: string): ErrorActionTypes => {
    return {
        type: GET_ERRORS,
        error: { message, status, id },
    };
};

// RETURN ERRORS INPUT FIELDS
export const returnErrorsInputFieldsSuccess = (inputFields: IInputFields, status: number, id: string): ErrorActionTypes => {
    return {
        type: GET_ERRORS_INPUTFIELDS,
        inputError: { inputFields, status, id },
    };
};

// CLEAR ERRORS
export const clearErrorsSuccess = (): ErrorActionTypes => {
    return {
        type: CLEAR_ERRORS,
    };
};

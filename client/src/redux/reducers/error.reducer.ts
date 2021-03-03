import { GET_ERRORS, GET_ERRORS_INPUTFIELDS, CLEAR_ERRORS, ErrorActionTypes, ErrorState, IInputFields } from "../types/error";

const initialState: ErrorState = {
    inputFields: {} as IInputFields,
    message: "",
    status: 0,
    id: "",
};

const errorState = (state = initialState, action: ErrorActionTypes) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                inputFields: {},
                message: action.error.message,
                status: action.error.status,
                id: action.error.id,
            };

        case GET_ERRORS_INPUTFIELDS:
            return {
                inputFields: action.inputError.inputFields,
                message: "",
                status: action.inputError.status,
                id: action.inputError.id,
            };

        case CLEAR_ERRORS:
            return {
                inputFields: {} as IInputFields,
                message: "",
                status: 0,
                id: "",
            };
        default:
            return state;
    }
};

export default errorState;

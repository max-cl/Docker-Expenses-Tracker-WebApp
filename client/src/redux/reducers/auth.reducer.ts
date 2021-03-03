import {
    IUser,
    AuthState,
    AuthActionTypes,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOGOUT_SUCCESS,
    UPDATE_USER_INFORMATION_REQUEST,
    UPDATE_USER_INFORMATION_SUCCESS,
    CLEAR_AUTH_RESPONSE_SUCCESS,
} from "../types/auth";

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: {} as IUser,
    message: "",
    status: 0,
    loading: false,
    loaded: false,
};

const authState = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
        case LOGIN_REQUEST:
        case UPDATE_USER_INFORMATION_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
            };

        case LOAD_USER_SUCCESS:
            return {
                ...state,
                token: localStorage.getItem("token"),
                isAuthenticated: action.userLoaded.isAuthenticated,
                user: action.userLoaded.user,
                message: action.userLoaded.message,
                loading: false,
                loaded: true,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.userLoged.token ? action.userLoged.token : "");
            return {
                ...state,
                token: action.userLoged.token,
                isAuthenticated: action.userLoged.isAuthenticated,
                user: action.userLoged.user,
                message: action.userLoged.message,
                loading: false,
                loaded: true,
            };
        case LOAD_USER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: {} as IUser,
                message: "",
                status: 0,
                loading: false,
                loaded: false,
            };

        case UPDATE_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                user: action.userUpdated.userInfo,
                message: action.userUpdated.message,
                status: action.userUpdated.status,
                loading: false,
                loaded: true,
            };

        case CLEAR_AUTH_RESPONSE_SUCCESS:
            return {
                ...state,
                message: "",
                status: 0,
            };

        default:
            return state;
    }
};

export default authState;

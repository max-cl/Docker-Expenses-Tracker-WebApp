import {
    IUser,
    IAuth,
    AuthActionTypes,
    LOGIN_SUCCESS,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    UPDATE_USER_INFORMATION_SUCCESS,
    CLEAR_AUTH_RESPONSE_SUCCESS,
} from "../types/auth";

// Login User
export function loginSuccess(userLoged: IAuth): AuthActionTypes {
    return {
        type: LOGIN_SUCCESS,
        userLoged: userLoged,
    };
}

// Logout User
export function logoutSuccess(): AuthActionTypes {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Check token & load user
export function loadUserSuccess(userLoaded: IAuth): AuthActionTypes {
    return {
        type: LOAD_USER_SUCCESS,
        userLoaded: userLoaded,
    };
}

// Update USER information
export function updateUserInformationSuccess(userInfo: IUser, message: string, status: number): AuthActionTypes {
    return {
        type: UPDATE_USER_INFORMATION_SUCCESS,
        userUpdated: { userInfo, message, status },
    };
}

export function cleanAuthResponseSuccess(): AuthActionTypes {
    return {
        type: CLEAR_AUTH_RESPONSE_SUCCESS,
    };
}

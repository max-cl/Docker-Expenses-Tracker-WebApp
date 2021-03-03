export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const UPDATE_USER_INFORMATION_REQUEST = "UPDATE_USER_INFORMATION_REQUEST";
export const UPDATE_USER_INFORMATION_SUCCESS = "UPDATE_USER_INFORMATION_SUCCESS";
export const UPDATE_USER_INFORMATION_FAILURE = "UPDATE_USER_INFORMATION_FAILURE";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAILURE = "UPDATE_PASSWORD_FAILURE";

export const CLEAR_AUTH_RESPONSE_SUCCESS = "CLEAR_AUTH_RESPONSE_SUCCESS";

export interface IUser {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    description: string;
}

export interface IAuth {
    token: string | null;
    isAuthenticated: boolean;
    user: IUser;
    message: string;
    status: number;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: IUser;
    message: string;
    status: number;
    loading: boolean;
    loaded: boolean;
}

interface LoginAction {
    type: typeof LOGIN_REQUEST | typeof LOGIN_SUCCESS | typeof LOGIN_FAILURE;
    userLoged: IAuth;
}

interface LogoutAction {
    type: typeof LOGOUT_SUCCESS;
}

interface LoadUserAction {
    type: typeof LOAD_USER_REQUEST | typeof LOAD_USER_SUCCESS | typeof LOAD_USER_FAILURE;
    userLoaded: IAuth;
}

interface UpdateUserInformationAction {
    type: typeof UPDATE_USER_INFORMATION_REQUEST | typeof UPDATE_USER_INFORMATION_SUCCESS | typeof UPDATE_USER_INFORMATION_FAILURE;
    userUpdated: { userInfo: IUser; message: string; status: number };
}

interface ForgotPasswordAction {
    type: typeof FORGOT_PASSWORD_REQUEST | typeof FORGOT_PASSWORD_SUCCESS | typeof FORGOT_PASSWORD_FAILURE;
}

interface UpdateUserPasswordAction {
    type: typeof UPDATE_PASSWORD_REQUEST | typeof UPDATE_PASSWORD_SUCCESS | typeof UPDATE_PASSWORD_FAILURE;
}

interface CleanAuthResponseSuccessAction {
    type: typeof CLEAR_AUTH_RESPONSE_SUCCESS;
}

export type AuthActionTypes =
    | LoginAction
    | LogoutAction
    | LoadUserAction
    | UpdateUserInformationAction
    | ForgotPasswordAction
    | UpdateUserPasswordAction
    | CleanAuthResponseSuccessAction;

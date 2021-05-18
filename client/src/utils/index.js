import React from "react";
import { Redirect, Route } from "react-router-dom";
import { returnErrors, returnErrorsInputFields } from "../redux/thunks/error.thunk";
import { LOGOUT_SUCCESS } from "../redux/types/auth";

export const PrivateRoute = ({ component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("token") ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

// Get Timestamp format from a Date()
export const getTimestamp = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    const day = d.getDate();

    if (parseInt(month) < 10) {
        month = "0" + month;
    }

    return `${year}-${month}-${day}`;
};

// Setup config/headers and token to the API request (Actions)
export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    // If token, add to headers
    if (token) {
        config.headers["Authorization"] = `JWT ${token}`;
    }

    return config;
};

// Error Managment
export const errorManagment = (error, dispatch, actionType) => {
    let errorStatus, errorMessage;
    if (error.response.status === 401 && error.response.data.data === "jwt expired") {
        errorMessage = "Session has expired";
        errorStatus = error.status;
        dispatch(returnErrors(errorMessage, errorStatus, actionType));
        dispatch({ type: LOGOUT_SUCCESS });
    }
    if (error.response === undefined) {
        // network error
        errorStatus = 500;
        errorMessage = "Error: Network Error (Server is not running!)";
        dispatch(returnErrors(errorMessage, errorStatus, actionType));
    } else {
        // input fields error
        errorStatus = error.response.status;
        if (!error.response.data.success && error.response.data.errors) {
            dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, actionType));
        } else if (error.response.data.message === undefined) {
            errorMessage = error.response.data.data;
            dispatch(returnErrors(errorMessage, errorStatus, actionType));
        }
    }

    dispatch({ type: actionType });
};

// export const errorManagment = (error, dispatch, actionType) => {
//     let errorStatus, errorMessage;
//     if (error.response === undefined) {
//         // network error
//         errorStatus = 500;
//         errorMessage = "Error: Network Error (Server is not running!)";
//         dispatch(returnErrors(errorMessage, errorStatus, actionType));
//     } else {
//         // input fields error
//         errorStatus = error.response.status;
//         if (!error.response.data.success && error.response.data.errors) {
//             dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, actionType));
//         } else if (error.response.data.message === undefined) {
//             errorMessage = error.response.data.data;
//             dispatch(returnErrors(errorMessage, errorStatus, actionType));
//         }
//     }
//     dispatch({ type: actionType });
// };

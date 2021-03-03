import React from "react";
import { Redirect, Route } from "react-router-dom";

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

export const PublicRoute = ({ component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("token") ? (
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                ) : (
                    React.createElement(component, props)
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
    // const hours = d.getHours();
    // const minutes = d.getMinutes();
    // const seconds = d.getSeconds();

    if (parseInt(month) < 10) {
        month = "0" + month;
    }

    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

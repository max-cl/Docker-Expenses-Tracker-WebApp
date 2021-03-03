import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// Component
import FormForgotPassword from "../../FormForgotPassword";

// Actions
import { returnErrors, clearErrors, returnErrorsInputFields } from "../../../redux/thunks/error.thunk";

// Styles
import { useStyles } from "./styles";

// Types
import { RootState } from "../../../redux/reducers";
import { FORGOT_PASSWORD_FAILURE } from "../../../redux/types/auth";

// APIs
import { URL_FORGOT_PASSWORD } from "../../../redux/apis";

const title = {
    pageTitle: "Forgot Password",
};

const ForgotPassword: React.FC<{}> = () => {
    // Material UI styles
    const classes = useStyles();

    // Redux
    const dispatch = useDispatch();

    // Local States
    const [email, setEmail] = useState<string>("");
    const [responseSuccess, setResponseSuccess] = useState({ responseMessage: "", responseStatus: 0 });

    // Global States
    const errorInfo = useSelector((state: RootState) => state.error);

    const handleOnChange = (name: string, value: string) => {
        setEmail(value);
    };

    const handleSubmit = async () => {
        try {
            setResponseSuccess({ responseMessage: "", responseStatus: 0 });
            // Headers
            const config = { headers: { "Content-Type": "application/json" } };
            // Request body
            const body = JSON.stringify({ email });
            dispatch(clearErrors());
            const response = await axios.post<AxiosResponse>(`${URL_FORGOT_PASSWORD}`, body, config);
            setResponseSuccess({ responseMessage: response.data.data, responseStatus: response.status });
        } catch (error) {
            let errorStatus, errorMessage;
            if (error.response === undefined) {
                // network error
                errorStatus = 500;
                errorMessage = "Error: Network Error (Server is not running!)";
                dispatch(returnErrors(errorMessage, errorStatus, FORGOT_PASSWORD_FAILURE));
            } else {
                // input fields error
                errorStatus = error.response.status;
                if (!error.response.data.success && error.response.data.errors) {
                    dispatch(returnErrorsInputFields(error.response.data.errors, errorStatus, FORGOT_PASSWORD_FAILURE));
                } else if (error.response.data.message === undefined) {
                    // server errors (User not found, Password not match, etc.)
                    errorMessage = error.response.data.data;
                    dispatch(returnErrors(errorMessage, errorStatus, FORGOT_PASSWORD_FAILURE));
                }
            }
        }
    };

    const data = { email };

    return (
        <>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">{title.pageTitle || "Page Title Placeholder"}</Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.container}>
                <FormForgotPassword
                    data={data}
                    handleOnChange={handleOnChange}
                    handleSubmit={handleSubmit}
                    errorInfo={errorInfo}
                    responseSuccess={responseSuccess}
                />
            </div>
        </>
    );
};

export default ForgotPassword;

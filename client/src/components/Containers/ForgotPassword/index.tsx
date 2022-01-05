import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Component
import FormForgotPassword from '../../FormForgotPassword';

// Actions
import { clearErrors } from '../../../redux/thunks/error.thunk';

// Styles
import { useStyles } from './styles';

// Types
import { RootState } from '../../../redux/reducers';
import { FORGOT_PASSWORD_FAILURE } from '../../../redux/types/auth';

// APIs
import { URL_FORGOT_PASSWORD } from '../../../redux/apis';

// Utils
import { errorManagment } from '../../../utils';

const pageTitle = 'Forgot Password';

const ForgotPassword: React.FC<{}> = () => {
    // Material UI styles
    const classes = useStyles();

    // Redux
    const dispatch = useDispatch();

    // Local States
    const [email, setEmail] = useState<string>('');
    const [responseSuccess, setResponseSuccess] = useState({ responseMessage: '', responseStatus: 0 });

    // Global States
    const errorInfo = useSelector((state: RootState) => state.error);

    const handleOnChange = (name: string, value: string) => {
        setEmail(value);
    };

    const handleSubmit = async () => {
        try {
            setResponseSuccess({ responseMessage: '', responseStatus: 0 });
            // Headers
            const config = { headers: { 'Content-Type': 'application/json' } };
            // Request body
            const body = JSON.stringify({ email });
            dispatch(clearErrors());
            const response = await axios.post<AxiosResponse>(`${URL_FORGOT_PASSWORD}`, body, config);
            setResponseSuccess({ responseMessage: response.data.data, responseStatus: response.status });
        } catch (error) {
            errorManagment(error, dispatch, FORGOT_PASSWORD_FAILURE);
        }
    };

    const data = { email };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.titleAppBar}>
                        {pageTitle || 'Page Title Placeholder'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <div className={classes.formContainer}>
                    <FormForgotPassword
                        data={data}
                        handleOnChange={handleOnChange}
                        handleSubmit={handleSubmit}
                        errorInfo={errorInfo}
                        responseSuccess={responseSuccess}
                    />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;

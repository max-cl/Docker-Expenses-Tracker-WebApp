import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Components
import Spinner from '../../Common/Spinner';
import Button from '../../Common/Controls/Button';
import FormUpdatePassword from '../../FormUpdatePassword';

// Constants
import { URL_RESET_PASSWORD, URL_UPDATE_PASSWORD } from '../../../redux/apis';

// Actions
import { clearErrors } from '../../../redux/thunks/error.thunk';

// Styles
import { useStyles } from './styles';

// Types
import { RootState } from '../../../redux/reducers';
import { UPDATE_PASSWORD_FAILURE } from '../../../redux/types/auth';

// Utils
import { errorManagment } from '../../../utils';

const pageTitle = 'Password Update';

const ResetPassword: React.FC<{}> = () => {
    // Material UI styles
    const classes = useStyles();
    // Redux
    const dispatch = useDispatch();

    // Local States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState({ password: '', repeat_password: '' });
    const [updated, setUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [messageFromServer, setMessageFromServer] = useState('');
    const [statusResponse, setStatusResponse] = useState(0);

    // Global States
    const errorInfo = useSelector((state: RootState) => state.error);

    // Route Params
    const { token } = useParams<{ token: string }>();

    const handleOnChange = (name: string, value: string) => setPassword({ ...password, [name]: value });

    const handleSubmit = async () => {
        try {
            setStatusResponse(0);
            setMessageFromServer('');
            // Headers
            const config = { headers: { 'Content-Type': 'application/json' } };
            dispatch(clearErrors());
            const response = await axios.put<AxiosResponse>(
                `${URL_UPDATE_PASSWORD}`,
                {
                    username,
                    password: password.password,
                    repeat_password: password.repeat_password,
                    resetpasswordtoken: token,
                },
                config,
            );
            setStatusResponse(response.status);
            setMessageFromServer(response.data.data);
        } catch (error) {
            errorManagment(error, dispatch, UPDATE_PASSWORD_FAILURE);
        }
    };

    useEffect(() => {
        const sendResetPassword = async () => {
            try {
                const response = await axios.get<AxiosResponse>(`${URL_RESET_PASSWORD}/${token}`);
                if (response.status === 200) {
                    setUsername(response.data.data.username);
                    setUpdated(false);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log({ error });
                setUpdated(false);
                setIsLoading(false);
                setStatusResponse(error.response.status);
                setMessageFromServer(error.response.data.data);
            }
        };
        sendResetPassword();
    }, [token]);

    return (
        <>
            <div>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.titleAppBar}>
                            {pageTitle || 'Page Title Placeholder'}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>

            {(statusResponse === 403 || statusResponse === 404 || statusResponse === 400) && (
                <div className={classes.container}>
                    <div>
                        <Typography variant="h4" component="h4" color="error">
                            {messageFromServer}
                        </Typography>
                        <div>
                            <Button label="Back home" color="primary" isDisabled={false} btnType="submit" component={Link} to="/login" />
                            <Button
                                label="Back forgot password"
                                color="secondary"
                                isDisabled={false}
                                btnType="button"
                                component={Link}
                                to="/forgotpassword"
                            />
                        </div>
                    </div>
                </div>
            )}

            {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner />
                </div>
            )}
            {statusResponse === 200 && (
                <div className={classes.container}>
                    <div>
                        <Typography variant="h4" component="h4" color="primary">
                            {messageFromServer}
                        </Typography>
                        <div>
                            <Button label="Back home" color="primary" isDisabled={false} btnType="submit" component={Link} to="/login" />
                            <Button
                                label="Back forgot password"
                                color="secondary"
                                isDisabled={false}
                                btnType="button"
                                component={Link}
                                to="/forgotpassword"
                            />
                        </div>
                    </div>
                </div>
            )}

            {!updated && statusResponse !== 403 && statusResponse !== 404 && statusResponse !== 400 && (
                <div className={classes.container}>
                    <FormUpdatePassword data={password} handleOnChange={handleOnChange} handleSubmit={handleSubmit} errorInfo={errorInfo} />
                </div>
            )}
        </>
    );
};

export default ResetPassword;

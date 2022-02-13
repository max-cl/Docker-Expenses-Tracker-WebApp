import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
// Components
import FormLogin from '../../FormLogin';
import FormRegisterUser from '../../FormRegisterUser';
import Button from '../../Common/Controls/Button';
import Modal from '../../Common/Modal';
import ButtonContainer from '../../Common/Controls/ButtonContainer';

// Thunks
import { login } from '../../../redux/thunks/auth.thunk';
import { returnErrors, clearErrors, returnErrorsInputFields } from '../../../redux/thunks/error.thunk';

// Reducers
import { RootState } from '../../../redux/reducers';

// Material UI
import Typography from '@material-ui/core/Typography';

// Types
import { INewUser } from './interfaces';
import { FORGOT_PASSWORD_FAILURE } from '../../../redux/types/auth';

// Styles
import { useStyles } from './styles';

// APIs
import { URL_SIGNUP } from '../../../redux/apis';

// Roles
const dataOptions = [
    {
        category_id: 1,
        category_name: 'Admin',
    },
    {
        category_id: 2,
        category_name: 'Role_1',
    },
    {
        category_id: 3,
        category_name: 'Role_2',
    },
];

const Login: React.FC<{}> = () => {
    // Material UI
    const classes = useStyles();

    // To use the actions
    const dispatch = useDispatch();

    // Router
    const history = useHistory();

    // Global States
    const errorInfo = useSelector((state: RootState) => state.error);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Local States
    const [openAddUser, setOpenAddUser] = useState<boolean>(false);
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
    const [newUser, setNewUser] = useState<INewUser>({
        username: '',
        password: '',
        repeat_password: '',
        first_name: '',
        last_name: '',
        email: '',
        roles: '',
        role_id: 0,
    });
    const [newUserResponse, setNewUserResponse] = useState({ userMessage: '', userStatus: 0 });

    const handleOnChangeAddNewUser = (name: string, value: string) => setNewUser({ ...newUser, [name]: value });

    const handleOnChangeSelectRoles = (value: unknown) => {
        setNewUser({
            ...newUser,
            roles: dataOptions.filter((r) => r.category_id === parseInt(value as string, 10))[0].category_name,
            role_id: parseInt(value as string, 10),
        });
    };

    const handleAddNewUser = async () => {
        try {
            setNewUserResponse({ userMessage: '', userStatus: 0 });
            // Headers
            const config = { headers: { 'Content-Type': 'application/json' } };
            // Request body
            const body = JSON.stringify({
                username: newUser.username,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                password: newUser.password,
                repeat_password: newUser.repeat_password,
                email: newUser.email,
                roles: newUser.roles,
            });
            dispatch(clearErrors());
            const response = await axios.post<AxiosResponse>(`${URL_SIGNUP}`, body, config);
            setNewUserResponse({ userMessage: response.data.data.message, userStatus: response.status });
        } catch (error) {
            let errorStatus, errorMessage;
            if (error.response === undefined) {
                // network error
                errorStatus = 500;
                errorMessage = 'Error: Network Error (Server is not running!)';
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

    const openModalAddUser = () => {
        setNewUser({
            username: '',
            password: '',
            repeat_password: '',
            first_name: '',
            last_name: '',
            email: '',
            roles: '',
            role_id: 0,
        });
        setNewUserResponse({ userMessage: '', userStatus: 0 });
        setOpenAddUser(!openAddUser);
    };

    const handleOnChange = (name: string, value: string) => setLoginInfo({ ...loginInfo, [name]: value });

    const handleLogin = () => dispatch(login(loginInfo.username, loginInfo.password, history));

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/app/dashboard');
        }
    }, [isAuthenticated, history]);

    return (
        <div className={classes.container}>
            <div className={classes.signupContainer}>
                <Modal open={openAddUser} handleModal={() => setOpenAddUser(!openAddUser)}>
                    <FormRegisterUser
                        newUser={newUser}
                        handleOnChange={handleOnChangeAddNewUser}
                        handleSubmit={handleAddNewUser}
                        errorInfo={errorInfo}
                        newUserResponse={newUserResponse}
                        dataOptions={dataOptions}
                        handleOnChangeSelect={handleOnChangeSelectRoles}
                    />
                </Modal>
                <ButtonContainer>
                    <Button label="SignUp" color="primary" isDisabled={false} btnType="button" onClick={openModalAddUser} />
                </ButtonContainer>
            </div>
            <Typography variant="h2" className={classes.greeting}>
                Expenses Tracker
            </Typography>
            <div className={classes.loginContainer}>
                <FormLogin loginInfo={loginInfo} handleOnChange={handleOnChange} handleLogin={handleLogin} errorInfo={errorInfo} />
            </div>
        </div>
    );
};

export default Login;

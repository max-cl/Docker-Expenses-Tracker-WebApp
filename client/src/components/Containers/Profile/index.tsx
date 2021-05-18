import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

// Material UI
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

// Components
import FormEditProfile from '../../FormEditProfile';
import FormAddBudget from '../../FormAddBudget';
import Modal from '../../Common/Modal';
import Button from '../../Common/Controls/Button';
import Spinner from '../../Common/Spinner';
import Card from '../../Common/Card';

// Actions
import { cleanAuthResponseSuccess } from '../../../redux/actions/auth.action';

// Thunks
import { updateUserInformation } from '../../../redux/thunks/auth.thunk';
import { returnErrors, clearErrors, returnErrorsInputFields } from '../../../redux/thunks/error.thunk';

// Types
import { IProfileInfo, IAddBudget } from './interfaces';
import { RootState } from '../../../redux/reducers';
import { FORGOT_PASSWORD_FAILURE } from '../../../redux/types/auth';

// Styles
import { useStyles } from './styles';

// APIs
import { URL_ADD_BUDGET } from '../../../redux/apis';

const Profile: React.FC<{}> = () => {
    // Material UI
    const classes = useStyles();
    // React router
    let history = useHistory();
    // To use the actions
    const dispatch = useDispatch();

    // Local State
    const [openUpdateInfo, setOpenUpdateInfo] = useState<boolean>(false);
    const [openAddBudget, setOpenAddBudget] = useState<boolean>(false);
    const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
    });
    const [newBudget, setNewBudget] = useState<IAddBudget>({ amount: 0, budget_date: new Date() });
    const [newBudgetResponse, setNewBudgetResponse] = useState({ budgetStatus: 0, budgetMessage: '' });

    // Global States (Redux Store)
    const userInfo = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token);
    const userMessage = useSelector((state: RootState) => state.auth.message);
    const userStatus = useSelector((state: RootState) => state.auth.status);
    const errorInfo = useSelector((state: RootState) => state.error);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/login');
        } else {
            if (Object.entries(userInfo).length > 0) {
            }
        }
    }, [isAuthenticated, userInfo, history, dispatch]);

    const handleOnChangeBudget = (name: string, value: string) => setNewBudget({ ...newBudget, [name]: value });
    const handleDateChangeAddBudget = (value: Date | null) => setNewBudget({ ...newBudget, budget_date: value });
    const addNewBudget = () => {
        setNewBudgetResponse({ budgetStatus: 0, budgetMessage: '' });
        setNewBudget({ amount: 0, budget_date: new Date() });
        setOpenAddBudget(!openAddBudget);
    };
    const handleAddBudget = async () => {
        try {
            setNewBudgetResponse({ budgetStatus: 0, budgetMessage: '' });
            // Headers
            const config = { headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` } };
            // Request body
            const body = JSON.stringify({ amount: newBudget.amount, budget_date: newBudget.budget_date, user_id: userInfo.user_id });
            dispatch(clearErrors());
            const response = await axios.post<AxiosResponse>(`${URL_ADD_BUDGET}`, body, config);
            setNewBudgetResponse({ budgetMessage: response.data.data.message, budgetStatus: response.status });
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

    const handleOnChange = (name: string, value: string) => setProfileInfo({ ...profileInfo, [name]: value });

    const handleUpdate = () => {
        dispatch(
            updateUserInformation(userInfo.user_id, profileInfo.username, profileInfo.first_name, profileInfo.last_name, profileInfo.email)
        );
    };

    const editProfileInfo = () => {
        dispatch(cleanAuthResponseSuccess());
        dispatch(clearErrors());
        setOpenUpdateInfo(!openUpdateInfo);
        setProfileInfo({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            username: userInfo.username,
            email: userInfo.email,
        });
    };

    if (Object.keys(userInfo).length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner />
            </div>
        );
    }
    return (
        <div className={classes.container}>
            <Card customClasses={classes.card}>
                <Modal open={openAddBudget} handleModal={() => setOpenAddBudget(!openAddBudget)}>
                    <FormAddBudget
                        newBudget={newBudget}
                        handleOnChange={handleOnChangeBudget}
                        handleDateChange={handleDateChangeAddBudget}
                        handleAdd={handleAddBudget}
                        errorInfo={errorInfo}
                        newBudgetResponse={newBudgetResponse}
                    />
                </Modal>
                <Modal open={openUpdateInfo} handleModal={() => setOpenUpdateInfo(!openUpdateInfo)}>
                    <FormEditProfile
                        profileInfo={profileInfo}
                        handleOnChange={handleOnChange}
                        handleUpdate={handleUpdate}
                        errorInfo={errorInfo}
                        userMessage={userMessage}
                        userStatus={userStatus}
                    />
                </Modal>
                <div className={classes.cardDetail}>
                    <img src="https://fakeimg.pl/440x320/" alt="User image" className={classes.imgUser} />

                    <div className={classes.userInfoContainer}>
                        <Typography variant="h3" className={classes.title}>
                            {userInfo.first_name} {userInfo.last_name}
                        </Typography>
                        <div>
                            <Typography variant="body2" className={classes.typeInfo}>
                                Username:
                            </Typography>
                            <Typography variant="subtitle1">{userInfo.username}</Typography>
                        </div>
                        <div>
                            <Typography variant="body2" className={classes.typeInfo}>
                                Email:
                            </Typography>
                            <Typography variant="subtitle1">{userInfo.email}</Typography>
                        </div>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button
                            label="Edit Info"
                            color="primary"
                            isDisabled={false}
                            onClick={editProfileInfo}
                            btnType="button"
                            icon={<EditIcon />}
                        />
                        <Button
                            label="Add budget"
                            color="primary"
                            isDisabled={false}
                            onClick={addNewBudget}
                            btnType="button"
                            icon={<AddIcon />}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Profile;

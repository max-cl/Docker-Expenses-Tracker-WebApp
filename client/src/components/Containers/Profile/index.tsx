import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

// Components
import FormEditProfile from '../../FormEditProfile';
import FormAddBudget from '../../FormAddBudget';
import Modal from '../../Common/Modal';
import Button from '../../Common/Controls/Button';
import Spinner from '../../Common/Spinner';
import Card from '../../Common/Card';
import ProfileInformation from '../../ProfileInformation';

// Actions
import { cleanAuthResponseSuccess } from '../../../redux/actions/auth.action';

// Thunks
import { updateUserInformation } from '../../../redux/thunks/auth.thunk';
import { createBudget, cleanBudgetStates } from '../../../redux/thunks/budget.thunk';
import { clearErrors } from '../../../redux/thunks/error.thunk';

// Types
import { IProfileInfo, IAddBudget } from './interfaces';
import { RootState } from '../../../redux/reducers';

// Styles
import { useStyles } from './styles';

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

    // Global States (Redux Store)
    const userInfo = useSelector((state: RootState) => state.auth.user);
    const userMessage = useSelector((state: RootState) => state.auth.message);
    const userStatus = useSelector((state: RootState) => state.auth.status);
    const budgetMessage = useSelector((state: RootState) => state.budget.message);
    const budgetStatus = useSelector((state: RootState) => state.budget.status);
    const errorInfo = useSelector((state: RootState) => state.error);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/login');
        }
    }, [isAuthenticated, userInfo, history, dispatch]);

    const handleOnChangeBudget = (name: string, value: string) => setNewBudget({ ...newBudget, [name]: value });
    const handleDateChangeAddBudget = (value: Date | null) => setNewBudget({ ...newBudget, budget_date: value });
    const addNewBudget = () => {
        dispatch(cleanBudgetStates());
        setNewBudget({ amount: 0, budget_date: new Date() });
        setOpenAddBudget(!openAddBudget);
    };

    const handleAddBudget = async () => {
        dispatch(clearErrors());
        dispatch(cleanBudgetStates());
        dispatch(createBudget(newBudget.amount, newBudget.budget_date, userInfo.user_id));
    };

    const handleOnChange = (name: string, value: string) => setProfileInfo({ ...profileInfo, [name]: value });

    const handleUpdate = () => {
        dispatch(
            updateUserInformation(userInfo.user_id, profileInfo.username, profileInfo.first_name, profileInfo.last_name, profileInfo.email),
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
            <div className={classes.containerSpinner}>
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
                        newBudgetResponse={{ budgetMessage, budgetStatus }}
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
                <ProfileInformation userInfo={userInfo}>
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
                </ProfileInformation>
            </Card>
        </div>
    );
};

export default Profile;

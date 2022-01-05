import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// Components
import Form from '../Common/Controls/Form';
import Input from '../Common/Controls/Input';
import Select from '../Common/Controls/Select';
import Button from '../Common/Controls/Button';
import ServerError from '../Common/ServerError';

// Material-UI
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

// Interfaces
import { IProps } from './interfaces';

// Utils
import { addServerErrors } from '../utils';

const FormRegisterUser: React.FC<IProps> = ({
    newUser,
    handleOnChange,
    handleSubmit,
    errorInfo,
    newUserResponse,
    dataOptions,
    handleOnChangeSelect,
}) => {
    // React Hook Form
    const { errors, setError, control, clearErrors } = useForm<typeof newUser>();

    // Local State
    const [visibilityPassword, setVisibilityPassword] = useState({ visibilityPassword: false, visibilityRepeatPassword: false });

    useEffect(() => {
        // Error mangement
        clearErrors(); // Clear "error" variable from React Hook Form
        if (Object.keys(errorInfo.inputFields).length > 0) {
            addServerErrors(errorInfo.inputFields, setError);
        }
    }, [errorInfo.inputFields, clearErrors, setError]);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <>
                    {newUserResponse.userStatus === 201 && (
                        <div>
                            <Typography color="primary">{newUserResponse.userMessage}</Typography>
                        </div>
                    )}
                    <ServerError error={{ id: errorInfo.id, status: errorInfo.status, message: errorInfo.message }} />
                    <Input
                        name="first_name"
                        label="First name"
                        required={true}
                        isError={errors.first_name ? true : false}
                        errorMessage={errors.first_name ? errors.first_name.message : ''}
                        handleOnChange={handleOnChange}
                        value={newUser.first_name}
                        adornment=""
                        adornmentPosition=""
                        inputType="text"
                        errors={errors.first_name ? { first_name: errors.first_name } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />
                    <Input
                        name="last_name"
                        label="Last name"
                        required={true}
                        isError={errors.last_name ? true : false}
                        errorMessage={errors.last_name ? errors.last_name.message : ''}
                        handleOnChange={handleOnChange}
                        value={newUser.last_name}
                        adornment=""
                        adornmentPosition=""
                        inputType="text"
                        errors={errors.last_name ? { last_name: errors.last_name } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />
                    <Input
                        name="username"
                        label="Username"
                        required={true}
                        isError={errors.username ? true : false}
                        errorMessage={errors.username ? errors.username.message : ''}
                        handleOnChange={handleOnChange}
                        value={newUser.username}
                        adornment=""
                        adornmentPosition=""
                        inputType="text"
                        errors={errors.username ? { username: errors.username } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />
                    <Input
                        name="password"
                        label="New Password"
                        required={true}
                        isError={errors.password ? true : false}
                        errorMessage={errors.password ? errors.password.message : ''}
                        handleOnChange={handleOnChange}
                        value={newUser.password}
                        adornment={
                            <IconButton
                                onClick={() =>
                                    setVisibilityPassword({
                                        ...visibilityPassword,
                                        visibilityPassword: !visibilityPassword.visibilityPassword,
                                    })
                                }
                            >
                                {visibilityPassword.visibilityPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        }
                        adornmentPosition="end"
                        inputType={visibilityPassword.visibilityPassword ? 'text' : 'password'}
                        errors={errors.password ? { password: errors.password } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />
                    <Input
                        name="repeat_password"
                        label="Repeat Password"
                        required={true}
                        isError={errors.repeat_password ? true : false}
                        errorMessage={errors.repeat_password ? errors.repeat_password.message : ''}
                        handleOnChange={handleOnChange}
                        value={newUser.repeat_password}
                        adornment={
                            <IconButton
                                onClick={() =>
                                    setVisibilityPassword({
                                        ...visibilityPassword,
                                        visibilityRepeatPassword: !visibilityPassword.visibilityRepeatPassword,
                                    })
                                }
                            >
                                {visibilityPassword.visibilityRepeatPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        }
                        adornmentPosition="end"
                        inputType={visibilityPassword.visibilityRepeatPassword ? 'text' : 'password'}
                        errors={errors.repeat_password ? { repeat_password: errors.repeat_password } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />
                    <Input
                        name="email"
                        label="Email"
                        required={true}
                        isError={errors.email ? true : false}
                        errorMessage={errors.email ? errors.email.message : ''}
                        handleOnChange={handleOnChange}
                        value={newUser.email}
                        adornment=""
                        adornmentPosition=""
                        inputType="text"
                        errors={errors.email ? { email: errors.email } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />
                    <Select
                        name="role_id"
                        label="Role"
                        required={true}
                        isError={errors.role_id ? true : false}
                        errorMessage={errors.role_id ? errors.role_id.message : ''}
                        handleOnChange={handleOnChangeSelect}
                        value={newUser.role_id}
                        errors={errors.role_id ? { role_id: errors.role_id } : {}}
                        control={control}
                        clearErrors={clearErrors}
                        dataOptions={dataOptions}
                    />
                    <Button label="Register" color="primary" isDisabled={false} btnType="submit" />
                </>
            </Form>
        </>
    );
};

export default FormRegisterUser;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Components
import Form from '../Common/Controls/Form';
import Input from '../Common/Controls/Input';
import Button from '../Common/Controls/Button';
import ServerError from '../Common/ServerError';

// Material-UI
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

// Interfaces
import { IProps } from './interfaces';

// Utils
import { addServerErrors } from '../utils';

// Styles
import { useStyles } from './styles';

const FormUpdatePassword: React.FC<IProps> = ({ data, handleOnChange, handleSubmit, errorInfo }) => {
    // Styles
    const classes = useStyles();
    // React Hook Form
    const { errors, setError, control, clearErrors } = useForm<typeof data>();

    // Local State
    const [visibilityPassword, setVisibilityPassword] = useState({ visibilityPassword: false, visibilityRepeatPassword: false });

    useEffect(() => {
        // Error management
        clearErrors(); // Clear "error" variable from React Hook Form
        if (Object.keys(errorInfo.inputFields).length > 0) {
            addServerErrors(errorInfo.inputFields, setError);
        }
    }, [errorInfo.inputFields, clearErrors, setError]);

    return (
        <div className={classes.FormContainer}>
            <Form onSubmit={handleSubmit}>
                <>
                    <ServerError error={{ id: errorInfo.id, status: errorInfo.status, message: errorInfo.message }} />
                    <Input
                        name="password"
                        label="New Password"
                        required={true}
                        isError={errors.password ? true : false}
                        errorMessage={errors.password ? errors.password.message : ''}
                        handleOnChange={handleOnChange}
                        value={data.password}
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
                        value={data.repeat_password}
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

                    <>
                        <Button label="Update Password" color="primary" isDisabled={false} btnType="submit" />
                        <Button label="Back home" color="secondary" isDisabled={false} btnType="button" component={Link} to="/login" />
                    </>
                </>
            </Form>
        </div>
    );
};

export default FormUpdatePassword;

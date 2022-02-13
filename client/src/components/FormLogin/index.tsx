import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Components
import Form from '../Common/Controls/Form';
import Input from '../Common/Controls/Input';
import Button from '../Common/Controls/Button';
import ServerError from '../Common/ServerError';
import FormContainer from '../Common/Controls/FormContainer';
import ButtonContainer from '../Common/Controls/ButtonContainer';

// Material UI
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

// Interfaces
import { ILogin } from './interfaces';

// Utils
import { addServerErrors } from '../utils';

// Styles
import { useStyles } from './styles';

const FormLogin: React.FC<ILogin> = ({ loginInfo, handleOnChange, handleLogin, errorInfo }) => {
    // Styles
    const classes = useStyles();
    // React Hook Form
    const { errors, setError, control, clearErrors } = useForm<typeof loginInfo>();
    // Local State
    const [visibilityPassword, setVisibilityPassword] = useState(false);

    useEffect(() => {
        // Error management
        clearErrors(['username', 'password']); // Clear "error" variable from React Hook Form
        if (Object.keys(errorInfo.inputFields).length > 0) {
            addServerErrors(errorInfo.inputFields, setError);
        }
    }, [errorInfo.inputFields, clearErrors, setError]);

    return (
        <FormContainer>
            <Form onSubmit={handleLogin}>
                <>
                    <ServerError error={{ id: errorInfo.id, status: errorInfo.status, message: errorInfo.message }} />
                    <Input
                        name="username"
                        label="Username"
                        required={true}
                        isError={errors.username ? true : false}
                        errorMessage={errors.username ? errors.username.message : ''}
                        handleOnChange={handleOnChange}
                        value={loginInfo.username}
                        adornment=""
                        adornmentPosition=""
                        inputType="text"
                        errors={errors.username ? { username: errors.username } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />
                    <Input
                        name="password"
                        label="Password"
                        required={true}
                        isError={errors.password ? true : false}
                        errorMessage={errors.password ? errors.password.message : ''}
                        handleOnChange={handleOnChange}
                        value={loginInfo.password}
                        adornment={
                            <IconButton onClick={() => setVisibilityPassword(!visibilityPassword)}>
                                {visibilityPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        }
                        adornmentPosition="end"
                        inputType={visibilityPassword ? 'text' : 'password'}
                        errors={errors.password ? { password: errors.password } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />

                    <ButtonContainer>
                        <Button label="Login" color="secondary" isDisabled={false} btnType="submit" />
                    </ButtonContainer>
                    <Typography variant="body2" align="right" component={Link} to="/forgotpassword" className={classes.forgotPasswordLink}>
                        Forgot password?
                    </Typography>
                </>
            </Form>
        </FormContainer>
    );
};

export default FormLogin;

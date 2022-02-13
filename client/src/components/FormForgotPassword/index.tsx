import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Components
import Form from '../Common/Controls/Form';
import Input from '../Common/Controls/Input';
import Button from '../Common/Controls/Button';
import ServerError from '../Common/ServerError';
import ButtonContainer from '../Common/Controls/ButtonContainer';

// Material UI
import Typography from '@material-ui/core/Typography';

// Interfaces
import { IProps } from './interfaces';

// Utils
import { addServerErrors } from '../utils';

// Styles
import { useStyles } from './styles';

const FormForgotPassword: React.FC<IProps> = ({ data, handleOnChange, handleSubmit, errorInfo, responseSuccess }) => {
    // Styles
    const classes = useStyles();
    // React Hook Form
    const { errors, setError, control, clearErrors } = useForm<typeof data>();

    useEffect(() => {
        // Error mangement
        clearErrors(); // Clear "error" variable from React Hook Form
        if (Object.keys(errorInfo.inputFields).length > 0) {
            addServerErrors(errorInfo.inputFields, setError);
        }
    }, [errorInfo.inputFields, clearErrors, setError]);

    return (
        <div className={classes.FormContainer}>
            <Form onSubmit={handleSubmit}>
                <>
                    {responseSuccess.responseStatus === 200 && (
                        <div>
                            <Typography variant="body1" color="primary">
                                {responseSuccess.responseMessage}
                            </Typography>
                        </div>
                    )}
                    <ServerError error={{ id: errorInfo.id, status: errorInfo.status, message: errorInfo.message }} />
                    <Input
                        name="email"
                        label="Email"
                        required={true}
                        isError={errors.email ? true : false}
                        errorMessage={errors.email ? errors.email.message : ''}
                        handleOnChange={handleOnChange}
                        value={data.email}
                        adornment=""
                        adornmentPosition=""
                        inputType="text"
                        errors={errors.email ? { email: errors.email } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />

                    <>
                        <ButtonContainer>
                            <Button label="Reset Password" color="primary" isDisabled={false} btnType="submit" />
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button label="Back home" color="secondary" isDisabled={false} btnType="button" component={Link} to="/login" />
                        </ButtonContainer>
                    </>
                </>
            </Form>
        </div>
    );
};

export default FormForgotPassword;

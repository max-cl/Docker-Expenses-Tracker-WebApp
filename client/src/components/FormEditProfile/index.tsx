import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Components
import Form from '../Common/Controls/Form';
import Input from '../Common/Controls/Input';
import Button from '../Common/Controls/Button';
import ServerError from '../Common/ServerError';
import ButtonContainer from '../Common/Controls/ButtonContainer';

// Material-UI
import Typography from '@material-ui/core/Typography';

// Interfaces
import { IProps } from './interfaces';

// Utils
import { addServerErrors } from '../utils';

const FormEditProfile: React.FC<IProps> = ({ profileInfo, handleOnChange, handleUpdate, errorInfo, userMessage, userStatus }) => {
    // React Hook Form
    const { errors, setError, control, clearErrors } = useForm<typeof profileInfo>();

    useEffect(() => {
        // Error mangement
        clearErrors(); // Clear "error" variable from React Hook Form
        if (Object.keys(errorInfo.inputFields).length > 0) {
            addServerErrors(errorInfo.inputFields, setError);
        }
    }, [errorInfo.inputFields, clearErrors, setError]);

    return (
        <>
            <Form onSubmit={handleUpdate}>
                <>
                    {userStatus === 200 && (
                        <div>
                            <Typography color="primary">{userMessage}</Typography>
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
                        value={profileInfo.first_name}
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
                        value={profileInfo.last_name}
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
                        value={profileInfo.username}
                        adornment=""
                        adornmentPosition=""
                        inputType="text"
                        errors={errors.username ? { username: errors.username } : {}}
                        control={control}
                        clearErrors={clearErrors}
                        disabled={true}
                    />
                    <Input
                        name="email"
                        label="Email"
                        required={true}
                        isError={errors.email ? true : false}
                        errorMessage={errors.email ? errors.email.message : ''}
                        handleOnChange={handleOnChange}
                        value={profileInfo.email}
                        adornment=""
                        adornmentPosition=""
                        inputType="text"
                        errors={errors.email ? { email: errors.email } : {}}
                        control={control}
                        clearErrors={clearErrors}
                    />
                    <ButtonContainer>
                        <Button label="Update" color="primary" isDisabled={false} btnType="submit" />
                    </ButtonContainer>
                </>
            </Form>
        </>
    );
};

export default FormEditProfile;

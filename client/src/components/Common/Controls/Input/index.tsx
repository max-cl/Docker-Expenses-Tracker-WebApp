import React from 'react';
import { Controller } from 'react-hook-form';

// Components
import ErrorSummary from '../InputError';
import TextField from './textfield';

// Material UI
import FormControl from '@material-ui/core/FormControl';

// Interfaces
import { IProps } from './interfaces';

const MyInput: React.FC<IProps<any>> = ({
    name,
    label,
    required,
    handleOnChange,
    adornment,
    adornmentPosition,
    inputType,
    errors,
    control,
    isError,
    errorMessage,
    clearErrors,
    value,
    multiline,
    disabled,
}) => {
    return (
        <FormControl fullWidth margin="dense">
            <Controller
                name={`${name}`}
                render={(props) => (
                    <TextField
                        name={name}
                        label={label}
                        required={required}
                        handleOnChange={handleOnChange}
                        adornment={adornment}
                        adornmentPosition={adornmentPosition}
                        inputType={inputType}
                        isError={isError}
                        clearErrors={clearErrors}
                        value={value}
                        multiline={multiline}
                        disabled={disabled}
                        props={props}
                    />
                )}
                control={control}
                defaultValue={value}
            />
            <ErrorSummary errors={errors} />
        </FormControl>
    );
};

export default MyInput;

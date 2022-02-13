import React from 'react';
import { Controller } from 'react-hook-form';

// Components
import ErrorSummary from '../InputError';
import MySelectTag from './select';

// Material UI
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// Interfaces
import { IProps } from './interfaces';

const MySelect: React.FC<IProps<any>> = ({
    name,
    label,
    required,
    handleOnChange,
    errors,
    control,
    isError,
    errorMessage,
    clearErrors,
    value,
    dataOptions,
}) => {
    return (
        <FormControl fullWidth margin="dense">
            <InputLabel
                id={`select-label-${label}`}
                className={required ? 'required-label' : ''}
                required={required || false}
                variant="filled"
            >
                {label}
            </InputLabel>
            <Controller
                name={`${name}`}
                render={(props) => (
                    <MySelectTag
                        name={name}
                        label={label}
                        handleOnChange={handleOnChange}
                        isError={isError}
                        clearErrors={clearErrors}
                        dataOptions={dataOptions}
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

export default MySelect;

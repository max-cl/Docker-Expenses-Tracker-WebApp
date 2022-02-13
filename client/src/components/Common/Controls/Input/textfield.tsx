import React from 'react';

// Material UI
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

// Interfaces
export interface IProps<T> {
    name: string;
    label: string;
    required?: boolean;
    handleOnChange: (name: string, value: string) => void;
    value: string | number;
    adornment?: string | JSX.Element;
    adornmentPosition?: string;
    inputType: string;
    isError: boolean;
    clearErrors: (fieldName: T) => void;
    multiline?: boolean;
    disabled?: boolean;
    props: { onChange: (e: string) => void };
}

const MyTextField: React.FC<IProps<any>> = ({
    name,
    label,
    required,
    handleOnChange,
    adornment,
    adornmentPosition,
    inputType,
    isError,
    clearErrors,
    value,
    multiline,
    disabled,
    props,
}) => {
    return (
        <TextField
            name={`${name}`}
            fullWidth
            variant="filled"
            label={label}
            InputLabelProps={{
                className: required ? 'required-label' : '',
                required: required || false,
                color: 'primary',
            }}
            InputProps={{
                startAdornment: adornmentPosition === 'start' ? <InputAdornment position="start">{adornment}</InputAdornment> : undefined,
                endAdornment: adornmentPosition === 'end' ? <InputAdornment position="end">{adornment}</InputAdornment> : undefined,
            }}
            onChange={(e) => {
                props.onChange(e.target.value);
                handleOnChange(e.target.name, e.target.value);
                clearErrors(`${name}`);
            }}
            value={value}
            type={inputType}
            error={isError}
            // helperText={errorMessage}
            multiline={multiline}
            disabled={disabled}
        />
    );
};

export default MyTextField;

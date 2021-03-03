import React from "react";
import { Controller } from "react-hook-form";

// Components
import ErrorSummary from "../InputError";

// Material UI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

// Interfaces
import { IProps } from "./interfaces";

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
}) => {
    return (
        <FormControl fullWidth margin="dense">
            <Controller
                name={`${name}`}
                render={(props) => (
                    <TextField
                        name={`${name}`}
                        fullWidth
                        variant="filled"
                        label={label}
                        InputLabelProps={{
                            className: required ? "required-label" : "",
                            required: required || false,
                            color: "primary",
                        }}
                        InputProps={{
                            startAdornment:
                                adornmentPosition === "start" ? <InputAdornment position="start">{adornment}</InputAdornment> : undefined,
                            endAdornment:
                                adornmentPosition === "end" ? <InputAdornment position="end">{adornment}</InputAdornment> : undefined,
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

import React, { useState } from "react";
import { Controller } from "react-hook-form";

// Components
import ErrorSummary from "../InputError";

// Material UI
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// Interfaces
import { IProps } from "./interfaces";

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
    // Local State
    const [open, setOpen] = useState(false);

    const handleOpenClose = () => setOpen(!open);

    return (
        <FormControl fullWidth margin="dense">
            <InputLabel
                id={`select-label-${label}`}
                className={required ? "required-label" : ""}
                required={required || false}
                variant="filled"
            >
                {label}
            </InputLabel>
            <Controller
                name={`${name}`}
                render={(props) => (
                    <Select
                        name={`${name}`}
                        fullWidth
                        onChange={(e) => {
                            props.onChange(e.target.value);
                            handleOnChange(e.target.value);
                            clearErrors(`${name}`);
                        }}
                        value={props.value}
                        variant="filled"
                        error={isError}
                        // helperText={errorMessage}
                        open={open}
                        onClose={handleOpenClose}
                        onOpen={handleOpenClose}
                    >
                        <MenuItem value={0}>Select {label}</MenuItem>
                        {dataOptions.map((i) => (
                            <MenuItem key={i.category_id} value={i.category_id}>
                                {i.category_name}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                control={control}
                defaultValue={value}
            />
            <ErrorSummary errors={errors} />
        </FormControl>
    );
};

export default MySelect;

import React, { useState } from 'react';

// Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Interfaces
export interface IProps<T> {
    name: string;
    label: string;
    handleOnChange: (value: unknown) => void;
    isError: boolean;
    clearErrors: (fieldName: T) => void;
    dataOptions: any[];
    props: { onChange: (e: string | unknown) => void; value: unknown };
}

const MySelectTag: React.FC<IProps<any>> = ({ name, label, handleOnChange, isError, clearErrors, dataOptions, props }) => {
    // Local State
    const [open, setOpen] = useState(false);

    const handleOpenClose = () => setOpen(!open);

    return (
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
    );
};

export default MySelectTag;

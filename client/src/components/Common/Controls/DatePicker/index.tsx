import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

// Material UI
import Grid from "@material-ui/core/Grid";

// Components
import ErrorSummary from "../InputError";

// Interfaces
export interface IProps {
    name: string;
    handleDateChange: (date: Date | null) => void;
    value: Date | null;
    errors: any;
    isError: boolean;
    required: boolean | undefined;
}

const DatePicker: React.FC<IProps> = ({ name, value, handleDateChange, errors, isError, required }) => {
    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        autoOk
                        inputVariant="filled"
                        variant="inline"
                        format="yyyy-MM-dd"
                        margin="normal"
                        id="expense_date"
                        name={name}
                        label="Expense date"
                        value={value}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        style={{ width: "100%" }}
                        error={isError}
                        InputLabelProps={{
                            className: required ? "required-label" : "",
                            required: required || false,
                        }}
                        InputProps={{
                            classes: {
                                // input: classes.textField,
                            },
                        }}
                        InputAdornmentProps={{
                            position: "end",
                        }}
                        defaultValue={value}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <ErrorSummary errors={errors} />
        </>
    );
};

export default DatePicker;

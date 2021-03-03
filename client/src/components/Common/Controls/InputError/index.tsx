import React from "react";
import { FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// Material UI
import Fade from "@material-ui/core/Fade";
import WarningIcon from "@material-ui/icons/Warning";

// Styles
import { useStyles } from "./styles";

type ErrorSummaryProps<T> = {
    errors: FieldErrors<T>;
};

const ErrorSummary: React.FC<ErrorSummaryProps<any>> = ({ errors }) => {
    const classes = useStyles();

    if (Object.keys(errors).length === 0) {
        return null;
    }

    return (
        <>
            {Object.keys(errors).map((fieldName) => (
                <Fade in={true}>
                    <div className={classes.containerErrorMessage}>
                        <WarningIcon color="error" />
                        <ErrorMessage errors={errors} name={fieldName as any} as="p" key={fieldName} className={classes.errorMessage} />
                    </div>
                </Fade>
            ))}
        </>
    );
};

export default ErrorSummary;

import React from "react";

// Material UI
import Typography from "@material-ui/core/Typography";

// Styles
import { useStyles } from "./styles";

// Interfaces
import { IProps } from "./interfaces";

const ServerError: React.FC<IProps> = ({ error }) => {
    // Material UI
    const classes = useStyles();

    return (
        <div className={classes.containerErrorMessage}>
            <Typography color="secondary" className={classes.errorMessage}>
                {error.message}
            </Typography>
        </div>
    );
};

export default ServerError;

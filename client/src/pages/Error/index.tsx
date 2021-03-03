import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";

// Components
import Button from "../../components/Common/Controls/Button";

// styles
import { useStyles } from "./styles";

const Error: React.FC<{}> = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Paper classes={{ root: classes.paperRoot }}>
                <Typography variant="h1" color="primary" className={clsx(classes.textRow, classes.errorCode)}>
                    404
                </Typography>
                <Typography variant="h5" color="primary" className={classes.textRow}>
                    Oops. The resource you were looking for was NOT FOUND
                </Typography>
                <Button label="Back to Login" color="primary" component={Link} to="/login" isDisabled={false} btnType="button" />
            </Paper>
        </Grid>
    );
};

export default Error;

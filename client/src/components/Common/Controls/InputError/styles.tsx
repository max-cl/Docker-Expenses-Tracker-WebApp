import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerErrorMessage: {
            display: "flex",
            alignItems: "center",
            margin: theme.spacing(0.5, 0, 0, 0.5),
        },
        errorMessage: {
            textAlign: "left",
            margin: theme.spacing(0),
            color: theme.palette.error.main,
            fontWeight: theme.typography.fontWeightMedium,
        },
    }),
);

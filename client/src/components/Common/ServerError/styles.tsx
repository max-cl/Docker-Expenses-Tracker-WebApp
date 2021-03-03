import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerErrorMessage: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        errorMessage: {
            margin: theme.spacing(0),
            fontWeight: theme.typography.fontWeightMedium,
        },
    }),
);

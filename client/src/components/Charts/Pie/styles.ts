import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartContainer: {
            position: "relative",
            width: "100%",
            height: "100%",
        },
        image: {
            width: theme.spacing(8),
        },
    }),
);

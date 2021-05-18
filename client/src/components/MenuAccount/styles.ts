import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconButton: {
            "&:hover": {
                color: theme.palette.primary.main,
            },
        },
        menuItem: {
            "&:hover": {
                color: theme.palette.primary.main,
            },
        },
    }),
);

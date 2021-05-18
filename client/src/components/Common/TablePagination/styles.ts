import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.common.white,
        },
        selectDropdown: {},
        menuItem: {
            "&:hover": {},
        },
        toolbar: {
            [theme.breakpoints.down("lg")]: {
                padding: theme.spacing(0),
            },
        },
    }),
);

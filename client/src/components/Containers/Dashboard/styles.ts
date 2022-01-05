import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.secondary.main,
        },
    }),
);

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        forgotPasswordLink: {
            textDecoration: 'none',
            color: theme.palette.secondary.main,
            fontWeight: 600,
        },
    }),
);

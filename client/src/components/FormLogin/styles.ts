import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        forgotPasswordLink: {
            textDecoration: 'none',
            color: 'white',
            fontWeight: 600,
        },
    }),
);

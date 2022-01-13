import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(1, 2),
            height: '100%',
        },
        signupContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        greeting: {
            fontWeight: 800,
            fontSize: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',

            '&::after': {
                content: '""',
                borderBottom: `30px solid ${theme.palette.primary.main}`,
                bottom: 10,
                display: 'block',
                position: 'absolute',
                width: '5.4em',
                zIndex: -1,
                opacity: 0.4,
            },
        },
        loginContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
    }),
);

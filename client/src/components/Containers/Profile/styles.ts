import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: 'calc(100% - 64px)',
            display: 'flex',
            justifyContent: 'center',
            padding: theme.spacing(2),
            alignItems: 'center',
        },
        card: {
            padding: theme.spacing(2),
            height: '100%',
            width: '60%',
        },
        containerSpinner: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }),
);

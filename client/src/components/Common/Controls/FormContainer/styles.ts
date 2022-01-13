import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: 400,
            backgroundColor: '#fefefe',
            padding: theme.spacing(10, 5),
            zIndex: 1,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        },
    }),
);

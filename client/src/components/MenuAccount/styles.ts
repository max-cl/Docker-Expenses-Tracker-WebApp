import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'absolute',
            right: theme.spacing(3),
        },
        iconButton: {
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        menuItem: {
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
    }),
);

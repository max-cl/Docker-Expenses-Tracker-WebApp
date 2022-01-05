import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.default,
            overflow: 'hidden',
            transformOrigin: 'center top',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
            boxShadow: theme.shadows[0],
            transition: 'all .3s cubic-bezier(0.645, 0.045, 0.355, 1)',
            borderRadius: '.25rem',
        },
    }),
);

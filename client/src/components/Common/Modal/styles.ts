import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: '32%',
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(4),
            overflow: 'hidden',
            transformOrigin: 'center top',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
            boxShadow: theme.shadows[0],
            transition: 'all .3s cubic-bezier(0.645, 0.045, 0.355, 1)',
            borderRadius: '.4rem',
            [theme.breakpoints.down('md')]: {
                width: '64%',
            },
        },
        content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    }),
);

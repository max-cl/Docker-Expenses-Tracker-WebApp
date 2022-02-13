import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            margin: theme.spacing(1, 0),
        },

        card: {
            flexBasis: '25%',
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 100,
            margin: theme.spacing(0.25),
            boxShadow: 'rgb(0 0 0 / 24%) 0px 3px 8px',

            [theme.breakpoints.down('md')]: {
                flexBasis: '25%',
            },
            [theme.breakpoints.down('sm')]: {
                flexBasis: '45%',
            },
            [theme.breakpoints.down('xs')]: {
                flexBasis: '100%',
            },
        },
        content: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: theme.spacing(3),
            color: theme.palette.common.white,
        },
        infoContent: {
            textAlign: 'right',
        },
        image: {
            width: theme.spacing(8),
        },
        amountText: {
            fontSize: '2rem',
            margin: theme.spacing(0),
            fontWeight: 800,
        },
        title: {
            fontSize: '1rem',
            margin: theme.spacing(0),
            color: theme.palette.common.white,
        },
        description: {
            fontSize: '.75rem',
            margin: theme.spacing(0),
            color: theme.palette.common.white,
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        containerSpinner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        containerNotFound: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }),
);

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardDetail: {
            padding: theme.spacing(8),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },

        userInfoContainer: {
            display: 'grid',
            placeContent: 'center',
            position: 'relative',
        },
        imgUser: {
            top: `-${theme.spacing(6)}px`,
            left: `-${theme.spacing(9)}px`,
            width: '32%',
            opacity: 0.4,
            position: 'absolute',
        },
        title: {
            padding: theme.spacing(0, 0, 2),
            position: 'relative',
            fontSize: '3rem',
            fontWeight: 800,
            textTransform: 'uppercase',

            '&::after': {
                content: '""',
                position: 'absolute',
                borderBottom: `1.5rem solid ${theme.palette.primary.main}`,
                width: '100%',
                display: 'block',
                bottom: '10px',
                opacity: 0.4,
                zIndex: -1,
            },
        },
        typeInfo: {
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
        },

        buttonsContainer: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            padding: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                width: '96%',
            },
        },
    }),
);

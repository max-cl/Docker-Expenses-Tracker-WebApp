import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth: number = 240;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            height: '100%',
            backgroundColor: theme.palette.secondary.main,
        },
        sectionList: {
            fontWeight: 800,
            fontSize: '1.5rem',
            textTransform: 'uppercase',

            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        sectionSelected: {
            color: theme.palette.primary.main,
        },

        icon: {
            color: theme.palette.text.primary,

            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        iconSelected: {
            color: theme.palette.primary.main,
        },
    }),
);

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth: number = 240;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(4.5),
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        hide: {
            display: 'none',
        },
        titleAppBar: {
            fontWeight: 800,
            position: 'relative',

            '&::after': {
                content: '""',
                position: 'absolute',
                borderBottom: `0.25rem solid ${theme.palette.primary.main}`,
                width: '100%',
                display: 'block',
                bottom: 0,
            },
        },
        userFullNameContainer: {
            position: 'absolute',
            right: theme.spacing(9),
        },
    }),
);

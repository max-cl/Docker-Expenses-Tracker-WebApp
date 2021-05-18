import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: 592,
            display: 'flex',
            justifyContent: 'center',
        },
        card: {
            padding: theme.spacing(2),
            height: '100%',
            width: 'auto',
        },
        userInfoContainer: {
            margin: theme.spacing(4, 0, 2),
        },
        typeInfo: {
            fontWeight: 800,
        },
        cardDetail: {
            textAlign: 'center',
            padding: theme.spacing(2),
        },
        imgUser: {
            width: '50%',
            borderRadius: '50%',
        },
        title: {
            margin: theme.spacing(0, 0, 2),
        },
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
    })
);

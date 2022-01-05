import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.primary,
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

        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        formContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
    }),
);

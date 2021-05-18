import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
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
                borderBottom: `3px solid ${theme.palette.primary.main}`,
                width: '100%',
                display: 'block',
                bottom: 0,
            },
        },
    })
);

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        FormContainer: {
            width: '270px',
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: '0.8em',
            padding: '6em 2em',
            position: 'relative',
            zIndex: 1,

            // '&::before': {
            //     content: '""',
            //     background: 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
            //     display: 'block',
            //     position: 'absolute',
            //     top: 0,
            //     right: 0,
            //     left: 0,
            //     bottom: 0,
            //     opacity: 0.4,
            //     zIndex: '-1',
            // },
        },
    })
);

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        FormContainer: {
            width: 376,
            border: `0.25rem solid ${theme.palette.primary.main}`,
            borderRadius: '0.75rem',
            padding: theme.spacing(10, 5),
            zIndex: 1,
        },
    }),
);

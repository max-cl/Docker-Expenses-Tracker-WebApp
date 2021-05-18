import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonContainer: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    })
);

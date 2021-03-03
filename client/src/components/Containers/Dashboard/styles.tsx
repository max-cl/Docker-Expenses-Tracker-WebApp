import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
    createStyles({
        mainContainer: {
            gridArea: "main",
        },
    }),
);

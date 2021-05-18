import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            height: "100vh",
        },
    }),
);

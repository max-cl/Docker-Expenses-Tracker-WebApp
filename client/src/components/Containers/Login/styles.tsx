import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
    createStyles({
        greeting: {
            fontWeight: 500,
            textAlign: "center",
        },
    }),
);

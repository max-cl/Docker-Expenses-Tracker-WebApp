import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            display: "flex",
            flexWrap: "wrap",
            padding: theme.spacing(2),
            justifyContent: "center",
        },
        buttonAddExpensecontainer: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1,
        },
    }),
);

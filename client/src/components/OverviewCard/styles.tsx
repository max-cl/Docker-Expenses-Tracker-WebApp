import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            margin: theme.spacing(1, 0),
        },

        card: {
            flexBasis: "25%",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 100,
            margin: theme.spacing(0.25),
            [theme.breakpoints.down("md")]: {
                flexBasis: "25%",
            },
            [theme.breakpoints.down("sm")]: {
                flexBasis: "45%",
            },
            [theme.breakpoints.down("xs")]: {
                flexBasis: "100%",
            },
        },
        content: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: theme.spacing(3),
            color: theme.palette.common.white,
        },
        infoContent: {
            textAlign: "right",
        },
        image: {
            width: theme.spacing(8),
        },
        amountText: {
            fontWeight: theme.typography.fontWeightBold,
            fontSize: "2rem",
            margin: theme.spacing(0),
        },
        title: {
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: "0.8rem",
            margin: theme.spacing(0),
            color: theme.palette.common.white,
        },
        description: {
            fontWeight: theme.typography.fontWeightLight,
            fontSize: "0.7rem",
            margin: theme.spacing(0),
            color: theme.palette.common.white,
        },
    }),
);

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userInfoContainer: {
            margin: theme.spacing(4, 0, 2),
            display: "grid",
            placeContent: "center",
        },
        typeInfo: {
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 1.5,
        },
        cardDetail: {
            textAlign: "center",
            padding: theme.spacing(2),
        },
        imgUser: {
            width: "50%",
            borderRadius: "50%",
        },
        title: {
            margin: theme.spacing(0, 0, 2),
            position: "relative",
            "&::after": {
                content: '""',
                position: "absolute",
                borderBottom: `3px solid ${theme.palette.primary.main}`,
                width: "100%",
                display: "block",
            },
        },
        buttonsContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        },
    }),
);

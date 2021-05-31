import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        greeting: {
            fontWeight: 900,
            fontSize: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",

            "&::after": {
                content: '""',
                borderBottom: `30px solid ${theme.palette.primary.main}`,
                bottom: 10,
                display: "block",
                position: "absolute",
                width: "5.4em",
                zIndex: -1,
                opacity: 0.4,
            },
        },
    }),
);

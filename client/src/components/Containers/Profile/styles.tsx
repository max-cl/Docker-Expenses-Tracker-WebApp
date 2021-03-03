import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(1, 0),
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gridAutoRows: "624px",
            gridTemplateAreas: `'card1'`,
            gridGap: theme.spacing(1),
            "&>:nth-child(1)": {
                gridArea: "card1",
            },
        },
        card: {
            padding: theme.spacing(2),
        },
        info: {
            display: "flex",
            justifyContent: "space-between",
            color: "white",
        },
        typeInfo: {
            fontWeight: 900,
        },
        cardDetail: {
            maxWidth: "30%",
            margin: "auto",
            textAlign: "center",
            color: "white",
        },

        title: {
            fontSize: "18px",
        },

        aLink: {
            textDecoration: "none",
            fontSize: "22px",
            color: "white",
        },

        /* ============================================== */
        /* HDTV                                 1920x1080 */
        /* ============================================== */
        "@media screen and (min-width: 1680px) and (max-width: 1920px)": {
            container: {
                gridAutoRows: "896px",
            },
        },

        "@media screen and (max-width: 1679px)": {
            container: {
                gridAutoRows: "624px",
            },
        },

        "@media screen and (min-width: 400px) and (max-width: 899px)": {
            cardDetail: {
                maxWidth: "80%",
            },
        },
    }),
);

import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.down("md")]: {
                padding: 4,
            },
        },
        head: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: ".8rem",
        },
        body: {
            fontSize: ".8rem",
            color: theme.palette.common.white,
        },
    }),
)(TableCell);

export default StyledTableCell;

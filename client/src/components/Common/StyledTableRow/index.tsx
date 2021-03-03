import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
            },
            height: theme.spacing(5.8),
            [theme.breakpoints.down("lg")]: {
                height: theme.spacing(4.5),
            },
        },
    }),
)(TableRow);

export default StyledTableRow;

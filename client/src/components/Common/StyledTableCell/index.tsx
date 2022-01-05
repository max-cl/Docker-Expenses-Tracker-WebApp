import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.down('md')]: {
                padding: theme.spacing(0.5),
            },
        },
        head: {
            backgroundColor: theme.palette.primary.light,
            fontSize: '1rem',
            textTransform: 'uppercase',
            fontWeight: 800,
        },
        body: {
            fontSize: '1rem',
            color: theme.palette.common.white,
            fontWeight: 600,
        },
    }),
)(TableCell);

export default StyledTableCell;

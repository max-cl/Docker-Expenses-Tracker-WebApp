import React from "react";

// Material UI
import TablePagination from "@material-ui/core/TablePagination";

// Styles
import { useStyles } from "./styles";

// Interfaces
import { IProps } from "./interfaces";

const MyTablePagination: React.FC<IProps<any>> = ({
    dataCount,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    // Material UI
    const classes = useStyles();

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            className={classes.root}
            SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                MenuProps: { classes: { paper: classes.selectDropdown } },
            }}
            classes={{ menuItem: classes.menuItem, toolbar: classes.toolbar }}
        />
    );
};

export default MyTablePagination;

import React from "react";

// Components
import StyledTableCell from "../StyledTableCell";

// Material UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Styles
import { useStyles } from "./styles";

// Interfaces
import { IProps } from "./interfaces";

const MyTable: React.FC<IProps<any>> = ({ children, headInfo }) => {
    // Material UI
    const classes = useStyles();

    return (
        <Table className={classes.table} aria-label="table">
            <TableHead>
                <TableRow>
                    {headInfo.map((h) => (
                        <StyledTableCell key={h.id} align={h.align} width={h.width}>
                            {h.label}
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
        </Table>
    );
};

export default MyTable;

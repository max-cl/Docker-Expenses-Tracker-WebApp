import React from "react";

// Components
import Table from "../Common/Table";
import StyledTableCell from "../Common/StyledTableCell";
import StyledTableRow from "../Common/StyledTableRow";
import TablePagination from "../Common/TablePagination";
import Card from "../Common/Card";

// Material UI
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
// icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// Interfaces
import { IProps } from "./interfaces";

// utils
import { getTimestamp } from "../../utils";

const headInfo: {
    id: number;
    label: string;
    align: "left" | "right" | "inherit" | "center" | "justify" | undefined;
    width: string;
}[] = [
    { id: 0, label: "Title", align: undefined, width: "" },
    { id: 1, label: "Category", align: "right", width: "" },
    { id: 2, label: "Date", align: "right", width: "" },
    { id: 3, label: "Amount($)", align: "right", width: "" },
    { id: 4, label: "", align: "center", width: "20" },
    { id: 5, label: "", align: "center", width: "20" },
];

const TableExpenses: React.FC<IProps<any>> = ({ data, deleteExpense, editExpense, expenseCategories }) => {
    // Local states
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Card}>
                <Table headInfo={headInfo}>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((e) => (
                        <StyledTableRow key={e.expense_id}>
                            <StyledTableCell>{e.expense_name}</StyledTableCell>
                            <StyledTableCell align="right">
                                {expenseCategories !== undefined
                                    ? expenseCategories.filter((f) => f.category_id === e.category_id)[0].category_name
                                    : "category"}
                            </StyledTableCell>
                            <StyledTableCell align="right">{getTimestamp(e.expense_date)}</StyledTableCell>
                            <StyledTableCell align="right">$ {e.amount}</StyledTableCell>
                            <StyledTableCell align="center">
                                <IconButton onClick={() => deleteExpense(e.expense_id)}>
                                    <DeleteIcon color="primary" />
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <IconButton onClick={() => editExpense(e.expense_id)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </Table>
                <TablePagination
                    dataCount={data.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    );
};

export default TableExpenses;

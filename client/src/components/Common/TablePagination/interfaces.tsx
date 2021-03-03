export interface IProps<T> {
    dataCount: number;
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: T, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyTablePagination from './index';

describe('MyTablePagination Component', () => {
    it('should render a MyTablePagination ', () => {
        render(
            <MyTablePagination
                dataCount={2}
                page={0}
                rowsPerPage={10}
                handleChangePage={(e: any, n: number) => 10}
                handleChangeRowsPerPage={(e: any) => 10}
            />,
        );
        const tablePagination = screen.getByText('1-2 of 2');
        expect(tablePagination).toBeDefined();
    });
});

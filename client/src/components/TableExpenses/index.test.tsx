import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableExpenses from './index';

describe('TableExpenses Component', () => {
    const mockHandler = jest.fn();

    it('should render a TableExpenses ', () => {
        render(<TableExpenses data={[]} deleteExpense={mockHandler} editExpense={mockHandler} expenseCategories={[]} />);
        const tableExpenses = screen.getByLabelText('table');
        expect(tableExpenses).toBeDefined();
    });
});

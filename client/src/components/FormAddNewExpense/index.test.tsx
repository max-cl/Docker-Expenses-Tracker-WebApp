import { fireEvent, queryByAttribute, render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormAddNewExpense from './index';

describe('FormAddNewExpense Component', () => {
    let renderComponent: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
    const mockHandlerAdd = jest.fn();
    const mockHandlerOnChange = jest.fn();
    const mockHandlerDateChange = jest.fn();
    const mockNewExpense = {
        expense_name: 'test expense',
        amount: 999,
        category_id: 0,
        expense_date: new Date(),
        img_link: 'link-test',
    };
    const mockErrorInfo = {
        inputFields: {},
        id: '1',
        status: 404,
        message: 'message error test',
    };
    const mockHandleOnChangeSelect = jest.fn();
    const mockDataOptions = [{ category_id: 1, category_name: 'Bills', createdAt: '2022-10-12', updatedAt: '2022-10-12', deletedAt: null }];

    beforeEach(() => {
        renderComponent = render(
            <FormAddNewExpense
                newExpense={mockNewExpense}
                handleAdd={mockHandlerAdd}
                handleOnChange={mockHandlerOnChange}
                handleDateChange={mockHandlerDateChange}
                errorInfo={mockErrorInfo}
                dataOptions={mockDataOptions}
                expenseStatus={404}
                expenseMessage={'Error'}
                handleOnChangeSelect={mockHandleOnChangeSelect}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a FormAddNewExpense ', () => {
        const form = renderComponent.getByText('Add');
        expect(form).toBeDefined();
    });

    it('should render a FormAddNewExpense and click it', async () => {
        const buttonAddNewExpense = renderComponent.container.querySelector('button[type="submit"]') as HTMLInputElement;

        await waitFor(() => {
            /* fire events that update state */
            fireEvent.click(buttonAddNewExpense);
        });
        expect(mockHandlerAdd).toHaveBeenCalledTimes(1);
    });

    it('should render a FormAddNewExpense and onChange', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const inputAmount = getByName(renderComponent.container, 'amount') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(inputAmount, { target: { value: '1001' } });
        });
        expect(inputAmount.value).toBe('1001');
    });

    it('should render a FormAddNewExpense and onChange Date', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const inputDate = getByName(renderComponent.container, 'expense_date') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(inputDate, { target: { value: new Date('2022-10-12').toDateString() } });
        });
        expect(inputDate.value).toBe('Wed Oct 12 2022');
    });

    it('should render a FormAddNewExpense and select an category', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const inputCategories = getByName(renderComponent.container, 'category_id') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(inputCategories, { target: { value: 1 } });
        });
        expect(inputCategories.value).toBe('1');
    });
});

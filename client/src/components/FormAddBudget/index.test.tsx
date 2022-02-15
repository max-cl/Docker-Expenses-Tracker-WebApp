import { fireEvent, queryByAttribute, render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormAddBudget from './index';

describe('FormAddBudget Component', () => {
    let renderComponent: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
    const mockHandlerAdd = jest.fn();
    const mockHandlerOnChange = jest.fn();
    const mockHandlerDateChange = jest.fn();
    const mockNewBudget = {
        amount: 0,
        budget_date: new Date(),
    };
    const mockErrorInfo = {
        inputFields: {},
        id: '1',
        status: 404,
        message: 'message error test',
    };
    const mockNewBudgetResponse = {
        budgetStatus: 200,
        budgetMessage: 'message budget test',
    };

    beforeEach(() => {
        renderComponent = render(
            <FormAddBudget
                newBudget={mockNewBudget}
                handleAdd={mockHandlerAdd}
                handleOnChange={mockHandlerOnChange}
                handleDateChange={mockHandlerDateChange}
                errorInfo={mockErrorInfo}
                newBudgetResponse={mockNewBudgetResponse}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a FormAddBudget ', () => {
        const form = renderComponent.getByText('Add');
        expect(form).toBeDefined();
    });

    it('should render a FormAddBudget and click it', async () => {
        const buttonAddBudget = renderComponent.container.querySelector('button[type="submit"]') as HTMLInputElement;

        await waitFor(() => {
            /* fire events that update state */
            fireEvent.click(buttonAddBudget);
        });
        expect(mockHandlerAdd).toHaveBeenCalledTimes(1);
    });

    it('should render a FormAddBudget and onChange', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const inputAmount = getByName(renderComponent.container, 'amount') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(inputAmount, { target: { value: '1001' } });
        });
        expect(inputAmount.value).toBe('1001');
    });

    it('should render a FormAddBudget and onChange Date', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const inputDate = getByName(renderComponent.container, 'budget_date') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(inputDate, { target: { value: new Date('2022-10-12').toDateString() } });
        });
        expect(inputDate.value).toBe('Wed Oct 12 2022');
    });
});

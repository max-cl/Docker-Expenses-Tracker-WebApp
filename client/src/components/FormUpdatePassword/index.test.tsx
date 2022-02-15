import { fireEvent, queryByAttribute, render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormUpdatePassword from './index';

const mockRoute = jest.fn();
const mockSwitch = jest.fn();
jest.mock('react-router-dom', () => ({
    Route: () => mockRoute,
    Switch: () => mockSwitch,
}));

describe('FormUpdatePassword Component', () => {
    let renderComponent: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
    const mockHandlerSubmit = jest.fn();
    const mockHandlerOnChange = jest.fn();
    const mockData = {
        password: 'password123',
        repeat_password: 'password123',
    };
    const mockErrorInfo = {
        inputFields: {},
        id: '1',
        status: 404,
        message: 'message error test',
    };

    beforeEach(() => {
        renderComponent = render(
            <FormUpdatePassword
                data={mockData}
                handleSubmit={mockHandlerSubmit}
                handleOnChange={mockHandlerOnChange}
                errorInfo={mockErrorInfo}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a FormUpdatePassword ', () => {
        const form = renderComponent.getByText('Update Password');
        expect(form).toBeDefined();
    });

    it('should render a FormUpdatePassword and click it', async () => {
        const button = renderComponent.container.querySelector('button[type="submit"]') as HTMLInputElement;

        await waitFor(() => {
            /* fire events that update state */
            fireEvent.click(button);
        });
        expect(mockHandlerSubmit).toHaveBeenCalledTimes(1);
    });

    it('should render a FormUpdatePassword and onChange', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const input = getByName(renderComponent.container, 'password') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(input, { target: { value: 'new-password' } });
        });
        expect(input.value).toBe('new-password');
    });
});

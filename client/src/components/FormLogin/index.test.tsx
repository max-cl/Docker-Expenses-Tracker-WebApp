import { fireEvent, queryByAttribute, render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormLogin from './index';

const mockRoute = jest.fn();
const mockSwitch = jest.fn();
jest.mock('react-router-dom', () => ({
    Route: () => mockRoute,
    Switch: () => mockSwitch,
}));

describe('FormLogin Component', () => {
    let renderComponent: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
    const mockHandlerLogin = jest.fn();
    const mockHandlerOnChange = jest.fn();
    const mockData = {
        username: 'username',
        password: 'password123',
    };
    const mockErrorInfo = {
        inputFields: {},
        id: '1',
        status: 404,
        message: 'message error test',
    };

    beforeEach(() => {
        renderComponent = render(
            <FormLogin
                loginInfo={mockData}
                handleLogin={mockHandlerLogin}
                handleOnChange={mockHandlerOnChange}
                errorInfo={mockErrorInfo}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a FormLogin ', () => {
        const form = renderComponent.getByText('Login');
        expect(form).toBeDefined();
    });

    it('should render a FormLogin and click it', async () => {
        const button = renderComponent.container.querySelector('button[type="submit"]') as HTMLInputElement;

        await waitFor(() => {
            /* fire events that update state */
            fireEvent.click(button);
        });
        expect(mockHandlerLogin).toHaveBeenCalledTimes(1);
    });

    it.only('should render a FormLogin and onChange', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const input = getByName(renderComponent.container, 'password') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(input, { target: { value: 'new-password' } });
        });
        expect(input.value).toBe('new-password');
    });
});

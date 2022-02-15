import { fireEvent, queryByAttribute, render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormForgotPassword from './index';
import { MemoryRouter } from 'react-router-dom';

const mockRoute = jest.fn();
const mockSwitch = jest.fn();
jest.mock('react-router-dom', () => ({
    Route: () => mockRoute,
    Switch: () => mockSwitch,
}));

describe('FormForgotPassword Component', () => {
    let renderComponent: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
    const mockHandlerSubmit = jest.fn();
    const mockHandlerOnChange = jest.fn();
    const mockData = {
        email: 'mail@mail.com',
    };
    const mockErrorInfo = {
        inputFields: {},
        id: '1',
        status: 404,
        message: 'message error test',
    };

    const mockResponseSuccess = {
        responseMessage: 'message',
        responseStatus: 200,
    };

    beforeEach(() => {
        renderComponent = render(
            <FormForgotPassword
                data={mockData}
                handleSubmit={mockHandlerSubmit}
                handleOnChange={mockHandlerOnChange}
                errorInfo={mockErrorInfo}
                responseSuccess={mockResponseSuccess}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a FormForgotPassword ', () => {
        const form = renderComponent.getByText('Reset Password');
        expect(form).toBeDefined();
    });

    it('should render a FormForgotPassword and click it Submit (Reset Password)', async () => {
        const button = renderComponent.container.querySelector('button[type="submit"]') as HTMLInputElement;

        await waitFor(() => {
            /* fire events that update state */
            fireEvent.click(button);
        });
        expect(mockHandlerSubmit).toHaveBeenCalledTimes(1);
    });

    it.skip('should render a FormForgotPassword and click it Back Home', async () => {
        // const button = renderComponent.container.querySelector('button[to="button"]') as HTMLInputElement;
        render(
            <FormForgotPassword
                data={mockData}
                handleSubmit={mockHandlerSubmit}
                handleOnChange={mockHandlerOnChange}
                errorInfo={mockErrorInfo}
                responseSuccess={mockResponseSuccess}
            />,
            { wrapper: MemoryRouter },
        );
        const getByTo = queryByAttribute.bind(null, 'to');
        const button = getByTo(renderComponent.container, '/login') as HTMLInputElement;

        // console.log({ button });

        // renderComponent.getByText('asd');
        // const leftClick = { button: 0 };

        await waitFor(() => {
            /* fire events that update state */
            // userEvent.click(button, leftClick);
            fireEvent.click(button);
        });
        // expect(mockHandlerSubmit).toHaveBeenCalledTimes(1);
        expect(renderComponent.getByText('Hola')).toBeInTheDocument();
    });

    it('should render a FormForgotPassword and onChange', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const input = getByName(renderComponent.container, 'email') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(input, { target: { value: 'test@mail.org' } });
        });
        expect(input.value).toBe('test@mail.org');
    });
});

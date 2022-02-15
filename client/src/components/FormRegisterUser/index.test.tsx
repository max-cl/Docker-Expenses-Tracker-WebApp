import { fireEvent, queryByAttribute, render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormRegisterUser from './index';

describe('FormRegisterUser Component', () => {
    let renderComponent: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
    const mockHandlerSubmit = jest.fn();
    const mockHandlerOnChange = jest.fn();
    const mockHandleOnChangeSelect = jest.fn();
    const mockNewUser = {
        first_name: 'FirstName',
        last_name: 'LastName',
        username: 'username',
        email: 'mail@mail.com',
        password: 'password123',
        repeat_password: 'password123',
        role_id: 1,
    };
    const mockErrorInfo = {
        inputFields: {},
        id: '1',
        status: 404,
        message: 'message error test',
    };
    const mockNewUserResponse = {
        userMessage: 'message',
        userStatus: 200,
    };
    const mockDataOptions = [{ category_id: 1, category_name: 'Admin' }];

    beforeEach(() => {
        renderComponent = render(
            <FormRegisterUser
                newUser={mockNewUser}
                handleSubmit={mockHandlerSubmit}
                handleOnChange={mockHandlerOnChange}
                errorInfo={mockErrorInfo}
                newUserResponse={mockNewUserResponse}
                dataOptions={mockDataOptions}
                handleOnChangeSelect={mockHandleOnChangeSelect}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a FormRegisterUser ', () => {
        const form = renderComponent.getByText('Register');
        expect(form).toBeDefined();
    });

    it('should render a FormRegisterUser and click it', async () => {
        const button = renderComponent.container.querySelector('button[type="submit"]') as HTMLInputElement;

        await waitFor(() => {
            /* fire events that update state */
            fireEvent.click(button);
        });
        expect(mockHandlerSubmit).toHaveBeenCalledTimes(1);
    });

    it('should render a FormRegisterUser and onChange', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const input = getByName(renderComponent.container, 'username') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(input, { target: { value: 'new-username' } });
        });
        expect(input.value).toBe('new-username');
    });

    it('should render a FormRegisterUser and select an Role', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const select = getByName(renderComponent.container, 'role_id') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(select, { target: { value: 1 } });
        });
        expect(select.value).toBe('1');
    });
});

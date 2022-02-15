import { fireEvent, queryByAttribute, render, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormEditProfile from './index';

describe('FormEditProfile Component', () => {
    let renderComponent: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
    const mockHandlerUpdate = jest.fn();
    const mockHandlerOnChange = jest.fn();
    const mockProfileInfo = {
        first_name: 'FirstName',
        last_name: 'LastName',
        username: 'username',
        email: 'mail@mail.com',
    };
    const mockErrorInfo = {
        inputFields: {},
        id: '1',
        status: 404,
        message: 'message error test',
    };

    beforeEach(() => {
        renderComponent = render(
            <FormEditProfile
                profileInfo={mockProfileInfo}
                handleUpdate={mockHandlerUpdate}
                handleOnChange={mockHandlerOnChange}
                errorInfo={mockErrorInfo}
                userStatus={404}
                userMessage={'Error'}
            />,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a FormEditProfile ', () => {
        const form = renderComponent.getByText('Update');
        expect(form).toBeDefined();
    });

    it('should render a FormEditProfile and click it', async () => {
        const buttonUpdate = renderComponent.container.querySelector('button[type="submit"]') as HTMLInputElement;

        await waitFor(() => {
            /* fire events that update state */
            fireEvent.click(buttonUpdate);
        });
        expect(mockHandlerUpdate).toHaveBeenCalledTimes(1);
    });

    it('should render a FormEditProfile and onChange', async () => {
        const getByName = queryByAttribute.bind(null, 'name');
        const input = getByName(renderComponent.container, 'username') as HTMLInputElement;

        await waitFor(() => {
            fireEvent.click(input, { target: { value: 'new-username' } });
        });
        expect(input.value).toBe('new-username');
    });
});

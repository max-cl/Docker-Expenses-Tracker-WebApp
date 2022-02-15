import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyTextField from './textfield';

describe('MyTextField component', () => {
    const textfieldLabel = 'Username';
    const mockHandle = jest.fn();
    const mockHandle2 = { onChange: () => jest.fn() };

    beforeEach(() => {});

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render a MyTextField ', () => {
        render(
            <MyTextField
                name="username"
                label="Username"
                required={true}
                handleOnChange={mockHandle}
                value="test"
                adornment=""
                adornmentPosition=""
                inputType="text"
                isError={false}
                clearErrors={mockHandle}
                multiline={false}
                disabled={false}
                props={mockHandle2}
            />,
        );
        const textfield = screen.getByText(textfieldLabel);
        expect(textfield).toBeInTheDocument();
    });

    it('should redner a MyTextField with props', () => {
        render(
            <MyTextField
                name="username"
                label="Username"
                required={true}
                handleOnChange={mockHandle}
                value="test"
                adornment=""
                adornmentPosition=""
                inputType="text"
                isError={false}
                clearErrors={mockHandle}
                multiline={false}
                disabled={false}
                props={mockHandle2}
            />,
        );
        const textfield = screen.getByText(textfieldLabel);
        expect(textfield).toBeDefined();
        expect(textfield).toHaveTextContent(textfieldLabel);
        expect(textfield).toHaveAttribute('data-shrink', 'true');
    });
});

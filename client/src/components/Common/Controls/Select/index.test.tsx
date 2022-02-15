import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MySelectTag from './select';

describe('MySelectTag component', () => {
    const textfieldLabel = 'Username';
    const mockHandle = jest.fn();
    const mockHandle2 = { onChange: () => jest.fn(), value: '' };

    beforeEach(() => {});

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render a MySelectTag ', () => {
        render(
            <MySelectTag
                name="username"
                label="Username"
                handleOnChange={mockHandle}
                isError={false}
                clearErrors={mockHandle}
                props={mockHandle2}
                dataOptions={[]}
            />,
        );

        const select = screen.getByRole('button');
        expect(select).toHaveAttribute('aria-haspopup', 'listbox');
        expect(select).toBeInTheDocument();
    });

    it('should redner a MySelectTag with props', () => {
        render(
            <MySelectTag
                name="username"
                label="Username"
                handleOnChange={mockHandle}
                isError={false}
                clearErrors={mockHandle}
                props={mockHandle2}
                dataOptions={[]}
            />,
        );
        const select = screen.getByRole('button');
        expect(select).toBeDefined();
        expect(select).toHaveAttribute('aria-haspopup', 'listbox');
    });
});

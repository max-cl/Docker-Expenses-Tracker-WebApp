import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyForm from './index';

describe('Form Component', () => {
    const childrenText = 'Test';
    const mockHandle = jest.fn();

    it('should render a Form ', () => {
        render(
            <MyForm onSubmit={mockHandle}>
                <>Test</>
            </MyForm>,
        );
        const form = screen.getByText(childrenText);
        expect(form).toBeInTheDocument();
    });

    it('should render something inside of the Form', () => {
        const { getByText } = render(
            <MyForm onSubmit={mockHandle}>
                <>Test</>
            </MyForm>,
        );
        const rendered = getByText(childrenText);
        expect(rendered).toBeTruthy();
    });
});

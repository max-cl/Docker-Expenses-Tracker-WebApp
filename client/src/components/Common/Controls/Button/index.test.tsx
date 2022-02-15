import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './index';

describe('Button', () => {
    const btnValue = 'Save';
    const mockHandle = jest.fn();

    beforeEach(() => {});

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render a Button ', () => {
        render(<Button label={btnValue} onClick={mockHandle} color="primary" isDisabled={false} btnType="submit" component="div" to="" />);
        const button = screen.getByText(btnValue);
        expect(button).toBeInTheDocument();
    });

    it('should redner a button with props', () => {
        render(<Button label={btnValue} onClick={mockHandle} color="primary" isDisabled={false} btnType="submit" component="div" to="" />);
        const button = screen.getByText(btnValue);
        screen.getByRole('button');
        expect(button).toBeDefined();
        expect(button).toHaveTextContent(btnValue);
        expect(button.parentElement).toHaveAttribute('aria-disabled', 'false'); // isDisabled
        fireEvent.click(button);
    });

    it('should render a button and click it', () => {
        render(<Button label={btnValue} onClick={mockHandle} color="primary" isDisabled={false} btnType="submit" component="div" to="" />);
        const button = screen.getByText(btnValue);

        fireEvent.click(button);
        expect(mockHandle).toHaveBeenCalledTimes(1);
    });

    it('should render a button as primary', () => {
        render(<Button label={btnValue} onClick={mockHandle} color="primary" isDisabled={false} btnType="submit" component="div" to="" />);
        const button = screen.getByText(btnValue);
        expect(button.parentElement).toHaveAttribute('class', expect.stringContaining('MuiButton-containedPrimary'));
    });

    it('should render a button as secondary', () => {
        render(
            <Button label={btnValue} onClick={mockHandle} color="secondary" isDisabled={false} btnType="submit" component="div" to="" />,
        );
        const button = screen.getByText(btnValue);
        expect(button.parentElement).toHaveAttribute('class', expect.stringContaining('MuiButton-containedSecondary'));
    });
});

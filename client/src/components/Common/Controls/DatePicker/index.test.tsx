import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DatePicker from './index';

describe('DatePicker Component', () => {
    it('should render a DatePicker ', () => {
        render(<DatePicker name="" handleDateChange={() => ''} value={null} errors="" isError={false} required={false} />);
        const picker = screen.getByText('Expense date');
        expect(picker).toBeInTheDocument();
    });
});

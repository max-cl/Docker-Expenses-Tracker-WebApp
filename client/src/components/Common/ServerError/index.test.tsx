import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ServerError from './index';

describe('ServerError Component', () => {
    it('should render a ServerError ', () => {
        render(<ServerError error={{ id: null, status: 404, message: 'error-test' }} />);
        const errorMessage = screen.getByText('error-test');
        expect(errorMessage).toBeInTheDocument();
    });
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Spinner from './index';

describe('Spinner Component', () => {
    it('should render a Spinner ', () => {
        render(<Spinner />);
        const spinner = screen.getByRole('progressbar');
        expect(spinner).toBeInTheDocument();
    });
});

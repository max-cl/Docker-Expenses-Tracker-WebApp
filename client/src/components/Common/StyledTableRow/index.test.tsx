import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StyledTableRow from './index';

describe('StyledTableRow Component', () => {
    it('should render a StyledTableRow ', () => {
        render(
            <table>
                <tbody>
                    <StyledTableRow />
                </tbody>
            </table>,
        );
    });
});

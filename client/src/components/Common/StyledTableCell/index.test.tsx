import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StyledTableCell from './index';

describe('StyledTableCell Component', () => {
    it('should render a StyledTableCell ', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <StyledTableCell />
                    </tr>
                </tbody>
            </table>,
        );
    });
});

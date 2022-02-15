import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonContainer from './index';

describe('ButtonContainer Component', () => {
    const childrenText = 'Test';

    it('should render a ButtonContainer ', () => {
        render(
            <ButtonContainer>
                <>Test</>
            </ButtonContainer>,
        );
        const containerForm = screen.getByText(childrenText);
        expect(containerForm).toBeInTheDocument();
    });

    it('should render something inside of the ButtonContainer', () => {
        const { getByText } = render(
            <ButtonContainer>
                <>Test</>
            </ButtonContainer>,
        );
        const rendered = getByText(childrenText);
        expect(rendered).toBeTruthy();
    });
});

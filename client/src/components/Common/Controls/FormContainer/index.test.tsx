import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormContainer from './index';

describe('FormContainer Component', () => {
    const childrenText = 'Test';

    it('should render a FormContainer ', () => {
        render(
            <FormContainer>
                <>Test</>
            </FormContainer>,
        );
        const form = screen.getByText(childrenText);
        expect(form).toBeInTheDocument();
    });

    it('should render something inside of the FormContainer', () => {
        const { getByText } = render(
            <FormContainer>
                <>Test</>
            </FormContainer>,
        );
        const rendered = getByText(childrenText);
        expect(rendered).toBeTruthy();
    });
});

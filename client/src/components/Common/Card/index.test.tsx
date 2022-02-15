import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyCard from './index';

describe('Card Component', () => {
    const childrenText = 'My Card';

    it('should render a Card ', () => {
        render(
            <MyCard>
                <h1>My Card</h1>
            </MyCard>,
        );
        const card = screen.getByText(childrenText);
        expect(card).toBeInTheDocument();
    });

    it('should render something inside of the Card', () => {
        const { getByText } = render(
            <MyCard>
                <h1>My Card</h1>
            </MyCard>,
        );
        const rendered = getByText(childrenText);
        expect(rendered).toBeTruthy();
    });
});

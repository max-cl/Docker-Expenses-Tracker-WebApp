import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OverviewCard from './index';

describe('OverviewCard Component', () => {
    const mockData = [
        {
            amount: 1000,
            title: 'car',
            description: 'car description',
            imgpath: 'link',
        },
    ];

    it('should render a OverviewCard ', () => {
        render(<OverviewCard data={mockData} />);
        const overviewCard = screen.getByText('car description');
        expect(overviewCard).toBeDefined();
    });
});

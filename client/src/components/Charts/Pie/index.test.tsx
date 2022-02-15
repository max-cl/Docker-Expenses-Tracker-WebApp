import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import Pie from './index';

describe('Bar Chart Component', () => {
    let renderComponent: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;
    const mockData = {
        labels: ['label1', 'label2'],
        value: [1, 2],
        title: 'bar-title',
        label: 'bar',
    };

    beforeEach(() => {
        renderComponent = render(<Pie data={mockData} />);
    });

    it('should render a Pie Chart ', () => {
        const chart = renderComponent.getByRole('chart');
        expect(chart).toBeDefined();
    });
});

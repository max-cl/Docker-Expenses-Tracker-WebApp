import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainCards from './index';

describe('MainCards Component', () => {
    const mockData = {
        chart1: React.createElement('div', { id: '1', role: 'test' }, 'one') as ReactNode,
        chart2: React.createElement('div', { id: '2' }, 'two') as ReactNode,
        chart3: React.createElement('div', { id: '3' }, 'three') as ReactNode,
        chart4: React.createElement('div', { id: '4' }, 'four') as ReactNode,
        chart5: React.createElement('div', { id: '5' }, 'five') as ReactNode,
    };

    it('should render a MainCards ', () => {
        render(<MainCards {...mockData} />);
        const mainCards = screen.getByRole('test');
        expect(mainCards).toBeDefined();
    });
});

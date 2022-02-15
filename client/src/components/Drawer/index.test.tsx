import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Drawer from './index';

const mockUseLocation = jest.fn();
jest.mock('react-router-dom', () => ({
    useLocation: () => mockUseLocation,
}));

describe('Drawer Component', () => {
    const mockHandler = jest.fn();
    const mockSectionsInfo = [
        {
            label: 'Dashboard',
            path: 'dashboard',
        },
    ];

    it('should render a Drawer ', () => {
        render(
            <Drawer open={false} handleDrawer={mockHandler} sectionsInfo={mockSectionsInfo} onSectionClick={mockHandler}>
                <>Test Drawer</>
            </Drawer>,
        );
        const drawer = screen.getByText('Test Drawer');
        expect(drawer).toBeDefined();
    });
});

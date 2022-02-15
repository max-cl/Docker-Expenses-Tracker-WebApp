import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyToolBar from './index';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('MyToolBar Component', () => {
    const mockHandler = jest.fn();
    it('should render a MyToolBar ', () => {
        render(<MyToolBar open={false} handleDrawer={mockHandler} title="Toolbar" fullName="Full Name" />);
        const toolbar = screen.getByText('Full Name');
        expect(toolbar).toBeDefined();
    });
});

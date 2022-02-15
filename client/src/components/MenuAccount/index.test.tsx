import { render, screen, fireEvent } from '@testing-library/react';
import MenuAccount from '../MenuAccount';
import * as reactRedux from 'react-redux';
import * as AuthThunks from '../../redux/thunks/auth.thunk';

/********************************** */
/** EXAMPLE 1 to solve useDispatch */
/********************************** */
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
}));

describe('MenuAccount component', () => {
    beforeEach(() => {
        const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        const mockDispatchFn = jest.fn();
        useDispatchSpy.mockReturnValue(mockDispatchFn);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockHandler = jest.fn();

    it('should render MenuAccount', () => {
        render(<MenuAccount anchorEl={null} handleMenu={mockHandler} handleClose={mockHandler} />);
        expect(screen.getByText('Profile')).toBeDefined();
        expect(screen.getByText('Logout')).toBeDefined();
    });

    it('dispatches Logout Thunk', () => {
        const logoutThunk = jest.spyOn(AuthThunks, 'logout');
        render(<MenuAccount anchorEl={null} handleMenu={mockHandler} handleClose={mockHandler} />);
        const button = screen.getByText('Logout');
        fireEvent.click(button);
        expect(logoutThunk).toHaveBeenCalled();
    });
});
/********************************** */
/** EXAMPLE 2 to solve useDispatch */
/********************************** */

// jest.mock('react-redux', () => ({
//     useDispatch: jest.fn(),
// }));

// describe('MenuAccount component', () => {
//     const mockHandler = jest.fn();
//     // const useDispatchMock = reactRedux.useDispatch;
//     const useDispatchMock = reactRedux.useDispatch as jest.MockedFunction<typeof reactRedux.useDispatch>;

//     beforeEach(() => {
//         // useDispatchMock.mockImplementation(function useDispatch<TDispatch = Dispatch<any>>(): TDispatch {});
//         // useDispatchMock.mockImplementation();
//         useDispatchMock.mockImplementation(() => () => {});
//     });
//     afterEach(() => {
//         useDispatchMock.mockClear();
//     });

//     const logoutThunk = jest.spyOn(AuthThunks, 'logout');

//     it('should render MenuAccount', () => {
//         render(<MenuAccount anchorEl={null} handleMenu={mockHandler} handleClose={mockHandler} />);
//         expect(screen.getByText('Profile')).toBeDefined();
//         expect(screen.getByText('Logout')).toBeDefined();
//     });

//     it('dispatches Logout Thunk', () => {
//         render(<MenuAccount anchorEl={null} handleMenu={mockHandler} handleClose={mockHandler} />);
//         const button = screen.getByText('Logout');
//         fireEvent.click(button);
//         expect(logoutThunk).toHaveBeenCalled();
//     });
// });

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyModal from './index';

describe('Modal Component', () => {
    it('should render a Modal ', () => {
        const modal = render(
            <MyModal open={false} handleModal={() => ''}>
                <h1>My Modal</h1>
            </MyModal>,
        );

        expect(modal.container).toBeInTheDocument();
    });
});

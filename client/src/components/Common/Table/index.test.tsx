import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyTable from './index';

describe('MyTable Component', () => {
    it('should render a MyTable ', () => {
        render(
            <MyTable
                headInfo={[
                    {
                        id: 1,
                        label: 'columnA',
                        align: 'center',
                        width: '100',
                    },
                ]}
            >
                <></>
            </MyTable>,
        );
        const table = screen.getByText('columnA');
        expect(table).toBeDefined();
    });
});

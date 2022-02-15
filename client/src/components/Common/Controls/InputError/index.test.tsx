import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputError from './index';

describe('FormContainer Component', () => {
    const errors = {
        type: '',
        ref: '',
        types: '',
        message: 'test',
    };

    it('should render a FormContainer ', () => {
        render(<InputError errors={errors} />);
    });
});

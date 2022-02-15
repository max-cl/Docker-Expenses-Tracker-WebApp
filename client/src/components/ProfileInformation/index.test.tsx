import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfileInformation from './index';

describe('ProfileInformation Component', () => {
    const userInformation = { first_name: 'FirstName', last_name: 'LastName', username: 'Username', email: 'email@mail.com' };

    it('should render a ProfileInformation ', () => {
        render(
            <ProfileInformation userInfo={userInformation}>
                <>Test Profile</>
            </ProfileInformation>,
        );
        const profile = screen.getByText('Test Profile');
        expect(profile).toBeDefined();
    });
});

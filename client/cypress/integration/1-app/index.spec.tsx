describe('App', () => {
    describe('Drawer', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000');
            cy.login('homer', '123123123');
        });

        afterEach(() => {
            cy.logout();
        });

        it('Open / Close Drawer', () => {
            cy.get('[aria-label="open drawer"]').click();
            cy.wait(500);
            cy.get('*[class^="MuiDrawer-root"] > div > div > button').click();
        });
    });

    describe('Section - Expenses', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000');
            cy.login('homer', '123123123');
            cy.get('ul').children('a').eq(1).click();
        });

        afterEach(() => {
            cy.logout();
        });

        it('Add a new expense', () => {
            cy.get('button').contains('Add Expense').click();
            cy.get('input[name=expense_name]').type('new expense test');
            // START Selecting "select-input"
            cy.get('#mui-component-select-category_id').click();
            cy.get('ul[role="listbox"] > li').eq(1).click();
            // END Selecting "select-input"
            cy.get('input[name=amount]').clear().type(554);
            cy.get('input[name=expense_date]').clear().type('2022-02-14');
            cy.get('input[name=img_link]').clear().type('new link test');
            cy.get('button[type=submit]').contains('Add').click();
            cy.get('body').trigger('keydown', { keyCode: 27 });
        });

        it('Remove an expense', () => {
            cy.get('table > tbody > tr')
                .first()
                .within(() => {
                    cy.get('button[type=button]').eq(0).click();
                });
        });

        it('Update an expense', () => {
            cy.get('table > tbody > tr')
                .first()
                .within(() => {
                    cy.get('button[type=button]').eq(1).click();
                });
            cy.get('input[name=expense_name]').clear().type('expense updated');
            // START Selecting "select-input"
            cy.get('#mui-component-select-category_id').click();
            cy.get('ul[role="listbox"] > li').eq(2).click();
            // END Selecting "select-input"
            cy.get('input[name=amount]').clear().type(652);
            cy.get('input[name=expense_date]').clear().type('2022-01-12');
            cy.get('input[name=img_link]').clear().type('link updated');
            cy.get('button[type=submit]').contains('Update').click();
            cy.get('body').trigger('keydown', { keyCode: 27 });
        });
    });

    describe('Section - Profile', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000');
            cy.login('homer', '123123123');
            cy.get('ul').children('a').eq(2).click();
        });

        afterEach(() => {
            cy.logout();
        });

        it('Update Profile Information', () => {
            cy.get('button').contains('Edit Info').click();
            cy.get('input[name=first_name]').clear().type('Homer test');
            cy.get('input[name=last_name]').clear().type('Simpson test');
            cy.get('input[name=email]').clear().type('homer.simpson.test@mail.com');
            cy.get('button[type=submit]').contains('Update').click();
            cy.get('body').trigger('keydown', { keyCode: 27 });
        });

        it('Add budget', () => {
            cy.get('button').contains('Add budget').click();
            cy.get('input[name=amount]').clear().type(12000);
            cy.get('input[name=budget_date]').clear().type('2022-02-14');
            cy.get('button[type=submit]').contains('Add').click();
            cy.get('body').trigger('keydown', { keyCode: 27 });
        });
    });
});

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('User is at the home page', () => {
	cy.visit('https://isqi.org/en/');

	// May need to specify the country - so check and see if pop-up is present
	cy.get('.isqi-cust-popup-body').then(($el) => {
		if ($el.is(':visible')) {
			// Yep, take the default country
			cy.contains('button', 'Enter').click({ force: true });
		}
	});
});

When('User searches for {string}', (searchTerm) => {
	// There are two elements, so grab the visible one
	const el = cy.findAllByPlaceholderText('Search our catalog').filter(':visible');

	// Do the business - note Cypress warns against chaining commands off of commands, so separate
	el.click();
	el.type(searchTerm);
	el.next('button').click();

	// Wait for results to load
	cy.findByText('SEARCH RESULTS FOR: "' + searchTerm + '"').should('exist');
});

When('User clicks learn more about {string}', (product) => {
	cy.findByTitle(product).parentsUntil('.course_space').contains('learn more').click();

	// Wait for page to load
	cy.contains('h1', product).should('exist');
});

When('User selects {string} {string}', (name, value) => {
	cy.findByText(name).next().select(value);
});

When('User checks option {string}', (option) => {
	cy.contains('label', option).next().find('input').check();
});

When('User clicks on button {string}', (button) => {
	cy.contains('button', button).click();

	// Wait for form to load - it's a bit slow so extend the timeout
	cy.findByText('Product successfully added to your shopping cart', { timeout: 20 * 1000 }).should('exist');
});

Then('User sees the cost of the course', (button) => {
	cy.findByText('Total (tax incl.)')
		.next('span')
		.invoke('text')
		.then((txt) => {
			cy.wrap(txt).as('courseCost');
			cy.log('Cost is ' + txt + '. This is recorded and can be accessed with - cy.get("@courseCost")');
		});
});

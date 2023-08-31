// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkResponseStatus', (statusCode, expStatus) => {
	expect(statusCode).to.equal(expStatus);
});

Cypress.Commands.add('printResponseBody', data => {
	cy.task('log', JSON.stringify(data));
});

Cypress.Commands.add('generateJSONSeedDb', () => {
	const data = [];
	const places = {
		'place name': 'Belmont',
		longitude: '-71.4594',
		'post code': '02178',
		latitude: '34.0901',
	};
	data.push(places);
	let jsonData = JSON.stringify(data, null, 2);
	cy.writeFile('./cypress/fixtures/places.json', jsonData, err => {
		if (err) {
			console.error(err);
			return;
		}
	});

	JSON.stringify(data, null, 2);

	cy.task('seed:singleDb');
});

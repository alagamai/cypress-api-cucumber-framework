import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import 'cypress-localstorage-commands';

Given(
	'I have a valid API endpoint for the postal code {string}',
	postalCode => {
		cy.wrap(postalCode).as('postalCode');
		cy.wrap(`/us/${postalCode}`).as('apiEndpoint');
	}
);

When('I make a GET request to the API endpoint', () => {
	cy.get('@apiEndpoint').then(apiEndpoint => {
		cy.request({
			method: 'GET',
			url: apiEndpoint,
			failOnStatusCode: true,
		}).as('resp');
	});
});

Then('the response status code should be {int}', statusCode => {
	cy.get('@resp').should('have.property', 'status', statusCode);
});

Then('the response should have the following properties:', dataTable => {
	cy.get('@resp').then(response => {
		dataTable.hashes().forEach(row => {
			console.log(response.body);
			const property = row['property']; // Access property as a string
			const value = row['value']; // Access value as a string
			console.log(property);
			console.log(value);
			cy.wrap(response.body.places[0]).should('have.property', property, value);
		});
	});
});

Then('the response should match the expected places:', expectedPlaces => {
	cy.get('@resp').then(response => {
		const actualPlaces = response.body.places[0];
		const parsedExpectedPlaces = JSON.parse(expectedPlaces);

		// Debugging output
		console.log('Actual Places:', actualPlaces);
		console.log('Expected Places:', parsedExpectedPlaces);

		// Use deep.equal to compare the objects
		expect(actualPlaces).to.deep.equal(parsedExpectedPlaces);
	});
});

Given(
	'I make a GET request to {string} with failOnStatusCode set to {string}',
	(url, failOnStatusCode) => {
		const failStatus = failOnStatusCode === 'false' ? false : true;
		// Make a GET request using Cypress
		cy.request({
			method: 'GET',
			url: url,
			failOnStatusCode: failStatus,
		}).as('resp');
	}
);

When('I receive a response', () => {
	console.log(`Response body ${cy.get('@resp')}`);
});

Then('the response should contain the following details:', dataTable => {
	// Get the response from the alias and perform assertions on its body
	cy.get('@resp').then(response => {
		dataTable.hashes().forEach(row => {
			expect(response.body).to.have.property(
				row['Field Name'],
				row['Expected Value']
			);
		});
	});
});

Given('I generate JSON data and seed the MongoDB database', () => {
	cy.generateJSONSeedDb();
});

When('I make a GET request to {string}', url => {
	// Make a GET request using Cypress
	cy.request({
		method: 'GET',
		url: url,
		failOnStatusCode: true,
	}).as('resp');
});

Then('the response should match the MongoDB data for the city', () => {
	// Get the response from the alias and compare it with MongoDB data
	cy.get('@resp').then(response => {
		// Fetch MongoDB data using Cypress task or custom logic
		cy.task('get:mongodbData').then(results => {
			expect(response.body.places[0]['place name']).to.equal(
				results[0]['place name']
			);
		});
	});
});

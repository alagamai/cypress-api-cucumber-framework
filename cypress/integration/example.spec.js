/// <reference types="cypress" />

const expectedPlaces =  require('../fixtures/expectedPlaces.json')

const generateJSONSeedDb = () => {
    const data = [];
    const places = {
        "place name": "Belmont",
        longitude: "-71.4594",
        "post code": "02178",
        latitude: "34.0901"
      };
      data.push(places)
      let jsonData = JSON.stringify(data, null, 2);
      cy.writeFile('./cypress/fixtures/places.json', jsonData, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      })
    
     JSON.stringify(data, null, 2);

    cy.task("seed:singleDb");

}
describe.only('api testing', () => {
    it('GET - api.zippopotam.us/country/postal-code', () => {
        cy.request({
            method: 'GET',
            url:  "/us/90210",
            failOnStatusCode : true,
        }).as('resp')
        cy.get('@resp').then(response => {
            let expStatus = 200
            cy.checkResponseStatus(response.status, expStatus)
            cy.printResponseBody(response.body)
            cy.task("log", response.body.country)
            expect(response.body.places[0]['state']).to.equal('California')
            expect(response.body).to.deep.equal(expectedPlaces)
        })

    })

    it('GET - api.zippopotam.us/country/state/city ', () => {
        cy.request({
            method: 'GET',
            url:  "/us/ma/belmont",
            failOnStatusCode : true,
        }).as('response')

        cy.get('@response').then(response => {
            let expStatus = 200
            cy.checkResponseStatus(response.status, expStatus)
            cy.printResponseBody(response.body)
            expect(response.body.places[0]['place name']).to.equal('Belmont')
        })
    })

    it('GET - negative test - api.zippopotam.us/invalid-country/state/city ', () => {
        cy.request({
            method: 'GET',
            url:  "/invalid/ma/belmont",
            failOnStatusCode : false,
        }).as('response')

        cy.get('@response').then(response => {
            let expStatus = 404
            cy.checkResponseStatus(response.status, expStatus)
            cy.printResponseBody(response.body)
        })
    })

    it('GET - Mongo DB integration test - api.zippopotam.us/invalid-country/state/city ', () => {
        generateJSONSeedDb();
        cy.request({
            method: 'GET',
            url:  "/us/ma/belmont",
            failOnStatusCode : true,
        }).as('response')

        cy.get('@response').then(response => {
            let expStatus = 200
            cy.checkResponseStatus(response.status, expStatus)
            cy.printResponseBody(response.body)
            cy.task("get:mongodbData").then(results => {
                expect(response.body.places[0]['place name']).to.equal(results[0]['place name'])
            })
        })

    })
})


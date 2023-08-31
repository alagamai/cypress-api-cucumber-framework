const mongouri =
	'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai';
const path = require('path');
const jsonPath = path.resolve(__dirname + '/cypress/fixtures/places.json');
const seeder = require('cypress-mongo-seeder');
var mongodb = require('mongodb');
const { defineConfig } = require('cypress');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');
const cypress = require('cypress');

async function setupNodeEvents(on, config) {
	// This is required for the preprocessor to be able to generate JSON reports after each run, and more,
	await preprocessor.addCucumberPreprocessorPlugin(on, config);
	on('file:preprocessor', browserify.default(config));

	// implement node event listeners here
	on('task', {
		log(message) {
			console.log(message);
			return null;
		},
		'seed:singleDb': () => {
			return seeder.seedSingleCollection(mongouri, jsonPath, true);
		},
		'get:mongodbData': () => {
			var client = mongodb.MongoClient;
			const results = [];

			return new Promise((resolve, reject) => {
				client.connect(mongouri, function (err, client) {
					var db = client.db('alagamai');
					var collection = db.collection('places');
					var query = {};
					var cursor = collection.find(query);

					collection.find(query).toArray(function (err, results) {
						console.log('Found the following documents:');
						console.log(results);

						if (err) {
							reject(err);
						} else {
							resolve(results);
						}
						//Close the client connection
						client.close();
					});
				});
			});
		},
	});
	// Make sure to return the config object as it might have been modified by the plugin.
	return config;
}

module.exports = {
	defaultCommandTimeout: 6000,
	env: {
		url: 'https://api.zippopotam.us',
	},
	retries: {
		runMode: 0,
	},
	projectId: 'fgkrft',
	e2e: {
		baseUrl: 'https://api.zippopotam.us',
		logLevel: 'trace',
		setupNodeEvents,
		//specPattern: 'cypress/integration/*.js',
		specPattern: '**/*.feature',
	},
};

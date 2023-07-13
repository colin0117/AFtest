const { defineConfig } = require('cypress');

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

const setupNodeEvents = async (on, config) => {
	await preprocessor.addCucumberPreprocessorPlugin(on, config);
	on(
		'file:preprocessor',
		createBundler({
			plugins: [createEsbuildPlugin.default(config)]
		})
	);
	on('task', {
		log(message) {
			// To use: cy.task("log", "my message");
			console.log(new Date() + ': ' + message);
			return null;
		}
	});
	return config;
};

module.exports = defineConfig({
	fixturesFolder: false,
	e2e: {
		setupNodeEvents,
		specPattern: '**/*.feature',
		excludeSpecPattern: ['*.js'],
		reporter: require.resolve('@badeball/cypress-cucumber-preprocessor/pretty-reporter')
	}
});

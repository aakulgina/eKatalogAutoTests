/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Allure, ContentType } from 'allure-js-commons';
import { browser, Config } from 'protractor';
import AllureReporter = require('jasmine-allure-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

declare const allure: Allure;

export const config: Config = {
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
	SELENIUM_PROMISE_MANAGER: false,
	capabilities: {
		browserName: 'chrome',
	},
	specs: ['tests/*Test.js'],
	framework: 'jasmine',
	onPrepare: function () {
		jasmine.getEnv().addReporter(
			new AllureReporter({
				resultsDir: 'allure-results',
			})
		);
		jasmine.getEnv().addReporter(
			new SpecReporter({
				spec: {
					displayStacktrace: true,
				},
			})
		);
		jasmine.getEnv().afterEach(function () {
			void browser.takeScreenshot().then(function (png) {
				allure.createAttachment('Screenshot', Buffer.from(png, 'base64'), ContentType.PNG);
			});
		});
	},
};

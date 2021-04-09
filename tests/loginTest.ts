import { browser, protractor } from 'protractor';
import { defaultData, loginOptions } from '../data.default.config';
import { BasePageObject } from '../pageObjects/base.po';
import { LoginPageObject } from '../pageObjects/login.po';

describe('Login user to e-katalog.ru', () => {
	it('Open e-katalog home page and log the user in with email', async () => {
		const homePage = new BasePageObject();
		const loginPage = new LoginPageObject();

		const EC = protractor.ExpectedConditions;

		// Выключаем проверку на AngularJS
		await browser.waitForAngularEnabled(false);

		// Открываем домашнюю страницу и вызываем модалку для авторизации
		await homePage.getHomePage();
		await homePage.getLogInBtn().click();
		await browser.wait(EC.presenceOf(loginPage.getLoginModal()), 5000);

		// Выбираем мыло в качестве опции для авторизации
		const loginOption = loginPage
			.getLoginOptions()
			.filter((item) => {
				return item.getText().then((value) => {
					return value === loginOptions.email;
				});
			})
			.first();
		await loginOption.click();

		// Вводим креды, авторизуемся
		await loginPage.getLoginField().sendKeys(defaultData.user.login);
		await loginPage.getPasswordField().sendKeys(defaultData.user.password);
		await loginPage.getSubmitBtn().click();

		// Проверяем, что авторизация прошла успешно
		await browser.wait(EC.presenceOf(homePage.getUserName()), 5000);
		expect(homePage.getUserName().getText()).toMatch(defaultData.user.name);
	});
});

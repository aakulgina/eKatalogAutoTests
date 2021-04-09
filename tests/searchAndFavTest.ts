import { browser, protractor } from 'protractor';
import { defaultData } from '../data.default.config';
import { ProductCardPageObject } from '../pageObjects/productCard.po';
import { ProfilePageObject } from '../pageObjects/profile.po';
import { SearchPageObject } from '../pageObjects/search.po';

describe('Search for a product by manufacturer + function and add it to favs', () => {
	it('Open nav section and search for a product', async () => {
		const searchPage = new SearchPageObject();

		const EC = protractor.ExpectedConditions;

		// Выключаем проверку на AngularJS
		await browser.waitForAngularEnabled(false);

		// Открываем нужную категорию
		await searchPage.getCategoryPage('camerasSearch');

		// Разворачиваем список брендов и выбираем указанный в конфиге
		await browser.wait(EC.presenceOf(searchPage.getAllBrandsBtn()), 5000);
		await browser.wait(searchPage.getAllBrandsBtn().click(), 5000);
		const manufacturer = searchPage.getBrandsList().filter((item) => {
			return item.getText().then((value) => {
				return value === defaultData.camerasSearch.searchParams.manufacturer;
			});
		});
		await browser.wait(EC.presenceOf(manufacturer.first()), 5000);
		await manufacturer.click();

		// Добавляем дополнительный параметр поиска
		const neededFeature = searchPage.getParams().filter((item) => {
			return item.getText().then((value) => {
				return value === defaultData.camerasSearch.searchParams.additional;
			});
		});
		await neededFeature.click();

		// Выполняем поиск
		await browser.wait(EC.presenceOf(searchPage.getShowModelsBtn()), 5000);
		await searchPage.getShowModelsBtn().click();

		// Проверяем наличие указанного в конфиге товара
		await browser.wait(EC.urlContains('list'), 5000);
		await searchPage
			.getFoundProductNames()
			.getText()
			.then((items) => {
				expect(items).toContain(defaultData.camerasSearch.productToSearch.name);
			});
	});

	it("Open product's card and add it to favs", async () => {
		const productCard = new ProductCardPageObject();

		const EC = protractor.ExpectedConditions;

		// Выключаем проверку на AngularJS
		await browser.waitForAngularEnabled(false);

		// Переходим в карточку продукта, проверяем, что она прогрузилась
		await productCard.getCard('camerasSearch');
		await browser.wait(EC.presenceOf(productCard.getFavBtn()), 5000);

		// Добавляем продукт в избранное
		await productCard.getFavBtn().click();
	});

	it('Open user profile and check if the product is present in favs', async () => {
		const userProfile = new ProfilePageObject();

		const EC = protractor.ExpectedConditions;

		// Выключаем проверку на AngularJS
		await browser.waitForAngularEnabled(false);

		// Переходим в профиль пользователя
		await userProfile.getUserName().click();
		await browser.wait(EC.urlContains('view_=user'), 5000);

		// Проверяем, что продукт появился в закладках
		await userProfile
			.getLastAddedFav()
			.getText()
			.then((value) => {
				expect(value).toContain(defaultData.camerasSearch.productToSearch.name);
			});
	});

	it('Open user profile and check if the product is present in history', async () => {
		const userProfile = new ProfilePageObject();

		const EC = protractor.ExpectedConditions;

		// Выключаем проверку на AngularJS
		await browser.waitForAngularEnabled(false);

		// Переходим в профиль пользователя
		await userProfile.getUserName().click();
		await browser.wait(EC.urlContains('view_=user'), 5000);

		// Проверяем, что продукт появился в истории просмотров
		await userProfile
			.getMostRecentHistoryItem()
			.getText()
			.then((value) => {
				expect(value).toContain(defaultData.camerasSearch.productToSearch.name);
			});
	});
});

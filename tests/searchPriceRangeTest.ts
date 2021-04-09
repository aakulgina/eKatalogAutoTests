import _ from 'lodash';
import { browser, protractor } from 'protractor';
import { defaultData } from '../data.default.config';
import { SearchPageObject } from '../pageObjects/search.po';

describe('Search for a product by max price', () => {
	defaultData.tabletSearch.searchParams.maxPrice.map((priceItem) => {
		it(`Open nav section and make a search query with max price ${priceItem}`, async () => {
			const searchPage = new SearchPageObject();

			const EC = protractor.ExpectedConditions;

			// Выключаем проверку на AngularJS
			await browser.waitForAngularEnabled(false);

			// Открываем страницу категории и проверяем, что нужный фильтр прогрузился
			await searchPage.getCategoryPage('tabletSearch');
			await browser.wait(EC.presenceOf(searchPage.getMaxPriceInput()), 5000);

			// Задаем максимальную цену и выполняем поиск
			await searchPage.getMaxPriceInput().sendKeys(priceItem);
			await browser.wait(EC.presenceOf(searchPage.getShowModelsBtn()), 7000);
			await searchPage.getShowModelsBtn().click();

			// Убеждаемся, что в результатах не пусто,
			// (т.е. что на странице отсутствует блок с уведомой о том, что по запросу ничего не найдено)
			await searchPage.getNoResultBlock().then((items) => {
				expect(items.length).toBe(0);
			});

			// Проверяем, что цена укладывается в заявленные рамки
			await searchPage.getMinPriceFromResult().each((item) =>
				item?.getText().then((value) =>
					expect(
						_.toNumber(
							value
								.split(' ')
								.filter((el) => Number(el))
								.join('')
						)
					).toBeLessThanOrEqual(priceItem)
				)
			);
		});
	});
});

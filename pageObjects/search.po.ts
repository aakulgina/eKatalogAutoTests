import _ from 'lodash';
import { browser, element, by, ElementFinder, promise, ElementArrayFinder } from 'protractor';
import { defaultData } from '../data.default.config';
import { BasePageObject } from './base.po';

/** Класс, описывающий страницу поиска */
export class SearchPageObject extends BasePageObject {
	/** Переход в нужную категорию для поиска
	 * @param categoryName Название категории. Является ключом в конфигурационном объекте defaultData
	 */
	getCategoryPage(categoryName: string): promise.Promise<unknown> {
		return browser.get(_.get(defaultData, `${categoryName}.categoryUrl`));
	}

	/** Получение кнопки "Все бренды".
	 * При работе с фильтром брендов настоятельно рекомендуется сначала раскрывать его целиком во избежание невозможности кликнуть по присутствующему в DOM элементу со свойством display: none
	 */
	getAllBrandsBtn(): ElementFinder {
		return element(by.xpath('//*[@id="br_all"]'));
	}

	/** Получение вообще всех возможных параметров для фильтрации */
	getParams(): ElementArrayFinder {
		return element.all(by.className('match-li-href'));
	}

	/** Получение списка брендов.
	 * Вынесен в отдельный метод, поскольку для корректной работы тестов важно, чтобы список был развернут полностью
	 */
	getBrandsList(): ElementArrayFinder {
		return element.all(by.className('match-li-href open'));
	}

	/** Получение кнопки "Показать", которая появляется после выбора признака для фильтрации */
	getShowModelsBtn(): ElementFinder {
		return element(by.css('a.show-models'));
	}

	/** Получение наименований найденных товаров */
	getFoundProductNames(): ElementArrayFinder {
		return element.all(by.className('model-short-title'));
	}

	/** Получения поля для ввода цены "до" */
	getMaxPriceInput(): ElementFinder {
		return element(by.id('maxPrice_'));
	}

	/** Получение информационного блока, сообщающего, что соответствующих запросу товаров не найдено */
	getNoResultBlock(): ElementArrayFinder {
		return element.all(by.xpath('//*[@id="msg_search_w"]'));
	}

	/** Получение минимальной стоимости всех найденных в результате поиска объектов */
	getMinPriceFromResult(): ElementArrayFinder {
		return element.all(by.className('model-hot-prices-td')).all(by.css('div:first-child > :first-child > a:first-child > :first-child'));
	}
}

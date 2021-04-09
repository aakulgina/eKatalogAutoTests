import _ from 'lodash';
import { browser, by, element, ElementFinder, promise } from 'protractor';
import { defaultData } from '../data.default.config';
import { BasePageObject } from './base.po';

/** Класс, описывающий карточку товара */
export class ProductCardPageObject extends BasePageObject {
	/** Переход в карточку товара.
	 * @param categoryName Название категории. Является ключом в конфигурационном объекте defaultData
	 */
	getCard(categoryName: string): promise.Promise<unknown> {
		return browser.get(_.get(defaultData, `${categoryName}.productToSearch.url`));
	}

	/** Получение кнопки для добавления в избранное (в список) */
	getFavBtn(): ElementFinder {
		return element(by.xpath('//*[@id="menu_addto"]/div[1]'));
	}
}

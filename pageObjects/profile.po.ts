import { by, element, ElementFinder } from 'protractor';
import { BasePageObject } from './base.po';

/** Класс, описывающий профиль пользователя */
export class ProfilePageObject extends BasePageObject {
	/** Получение последнего добавленного в избранное товара */
	getLastAddedFav(): ElementFinder {
		return element.all(by.className('ctg-slider__name')).first();
	}

	/** Получение самого недавнего элемента в истории просмотров.
	 * Самого недавнего -- поскольку порядок элементов истории не меняется
	 */
	getMostRecentHistoryItem(): ElementFinder {
		return element.all(by.className('user-history-item')).first();
	}
}

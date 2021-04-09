import { browser, by, element, ElementFinder, promise } from 'protractor';
import { defaultData } from '../data.default.config';

/** Класс, описывающий "базовую страницу" -- то есть те элементы, которые окажутся неизменны, где бы мы ни находились: например, топ-навигацию. */
export class BasePageObject {
	/** Получение домашней страницы тестируемого ресурса */
	getHomePage(): promise.Promise<unknown> {
		return browser.get(defaultData.homepage);
	}

	/** Получение кнопки "Войти" */
	getLogInBtn(): ElementFinder {
		return element(by.xpath('//*[@id="mui_user_login_row"]/span'));
	}

	/** Получение имени юзера, оно же ссылка на профиль */
	getUserName(): ElementFinder {
		return element(by.xpath('//*[@id="mui_user_login_row"]/a'));
	}
}

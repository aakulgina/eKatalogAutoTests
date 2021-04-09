import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { BasePageObject } from './base.po';

/** Класс, описывающий страницу входа */
export class LoginPageObject extends BasePageObject {
	/** Получение модалки для авторизации */
	getLoginModal(): ElementFinder {
		return element(by.xpath('//*[@id="mui_user_login_window"]'));
	}

	/** Получение всех доступных способов залогинить юзера */
	getLoginOptions(): ElementArrayFinder {
		return element.all(by.className('signin-with'));
	}

	/** Получение поля для ввода логина (вход по e-mail) */
	getLoginField(): ElementFinder {
		return element(by.name('l_'));
	}

	/** Получение поля для ввода пароля (вход по e-mail) */
	getPasswordField(): ElementFinder {
		return element(by.name('pw_'));
	}

	/** Получение кнопки "Войти" */
	getSubmitBtn(): ElementFinder {
		return element(by.className('ek-form-btn blue'));
	}
}

/** Конфигурационный объект для хранения изменяемых параметров */
export const defaultData = {
	/** Домашняя страница тестируемого ресурса */
	homepage: 'https://www.e-katalog.ru/',

	/** Поиск по экшн-камерам */
	camerasSearch: {
		/** Url категории */
		categoryUrl: 'https://www.e-katalog.ru/k695.htm',

		/** Продукт, наличие которого нужно проверить в результатах поиска */
		productToSearch: {
			/** Наименование продукта */
			name: 'GoPro HERO8',

			/** Url карточки продукта */
			url: 'https://www.e-katalog.ru/GOPRO-HERO8.htm',
		},

		/** Параметры поиска */
		searchParams: {
			/** Производитель */
			manufacturer: 'GoPro',

			/** Дополнительный параметр для фильтрации */
			additional: 'дисплей',
		},
	},

	/** Поиск по планшетам */
	tabletSearch: {
		/** Url категории */
		categoryUrl: 'https://www.e-katalog.ru/k30.htm',

		/** Параметры поиска */
		searchParams: {
			/** Цена "до" */
			maxPrice: [1000, 2000, 3000],
		},
	},

	/** Информация о юзере */
	user: {
		/** Имя, указанное при регистрации */
		name: '', // Put your name here

		/** Логин */
		login: '', // Put your login here

		/** Пароль */
		password: '', // Put your password here
	},
};

export const loginOptions = {
	email: 'E-mail',
	google: 'Google',
	fb: 'Facebook',
	vk: 'Вконтакте',
};

module.exports = {
	endOfLine: 'lf',
	tabWidth: 4,
	useTabs: true,
	printWidth: 180,
	overrides: [
		{
			files: ['*.json'],
			options: {
				parser: 'json',
				useTabs: false,
				tabWidth: 2,
				trailingComma: 'none',
				singleQuote: false,
			},
		},
		{
			files: ['*.ts'],
			options: {
				parser: 'typescript',
				trailingComma: 'es5',
				semi: true,
				singleQuote: true,
			},
		},
	],
};

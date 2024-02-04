const commonJSRules = {};

module.exports = {
	root: true,

	parserOptions: {
		extraFileExtensions: ['.md'],
	},

	settings: {
		'import/ignore': ['react-apexcharts'],
	},

	overrides: [
		{
			files: ['*.js', '*.cjs', '*.jsx', '*.cjsx'],
			extends: ['@react-hookz/eslint-config/base.cjs'],
			rules: {
				...commonJSRules,
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: './tsconfig.eslint.json',
			},
			extends: ['@react-hookz/eslint-config/typescript-unsafe.cjs'],
			rules: {
				...commonJSRules,
			},
		},
		{
			files: ['*.md'],
			extends: ['@react-hookz/eslint-config/md.cjs'],
		},
	],
};

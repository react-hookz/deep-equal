import baseConfig from '@react-hookz/eslint-config/base.js';
import mdConfig from '@react-hookz/eslint-config/md.js';
import typescriptUnsafe from '@react-hookz/eslint-config/typescript-unsafe.js';
import vitestConfig from '@react-hookz/eslint-config/vitest.js';

/** @typedef {import('eslint').Linter} Linter */
/** @type {Linter.Config[]} */
const config = [
	{
		ignores: ['.idea', 'coverage', 'dist', 'node_modules'],
	},
	...baseConfig,
	...mdConfig,
	...typescriptUnsafe,
	...vitestConfig,
];

export default config;

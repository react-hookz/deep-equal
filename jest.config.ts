import { type Config } from 'jest';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __esModule = true;

export default {
	testMatch: ['<rootDir>/src/__tests__/**/*.spec.ts'],
	extensionsToTreatAsEsm: ['.ts'],
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^((?:\\.{1,2}|#[^\\/]*)/.*)\\.[tj]sx?$': '$1',
	},
	transform: {
		'^.+\\.[tj]sx?$': ['@swc/jest', { module: { type: 'commonjs' } }],
	},
	collectCoverage: false,
	coverageDirectory: './coverage',
	collectCoverageFrom: ['src/**/*.ts', '!src/**/__tests__/**'],
} satisfies Config;

import {describe, expect, it} from 'vitest';
import {complexTestSuites, simpleTestSuites, type TestSuite} from './fixtures/fixtures.test.js';
import {isEqual, isEqualReact, isEqualReactSimple, isEqualSimple} from './index.js';

function runSuite(suites: TestSuite[], equalFn: (a: any, b: any) => boolean) {
	// eslint-disable-next-line vitest/valid-title
	describe(equalFn.name, () => {
		for (const suite of suites) {
			// eslint-disable-next-line vitest/valid-title
			describe(suite.name, () => {
				for (const test of suite.tests) {
					// eslint-disable-next-line vitest/valid-title
					it(test.name, () => {
						expect(equalFn(test.value1, test.value2)).toBe(test.equal);
					});

					it(`${test.name} (reverse args)`, () => {
						expect(equalFn(test.value2, test.value1)).toBe(test.equal);
					});
				}
			});
		}
	});
}

runSuite(simpleTestSuites, isEqual);
runSuite(simpleTestSuites, isEqualSimple);
runSuite(simpleTestSuites, isEqualReact);
runSuite(simpleTestSuites, isEqualReactSimple);

runSuite(complexTestSuites, isEqual);
runSuite(complexTestSuites, isEqualReact);

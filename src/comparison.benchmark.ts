import {dequal} from 'dequal';
import {dequal as dequalLite} from 'dequal/lite';
import fastDeepEqual from 'fast-deep-equal';
import fastDeepEqualES6 from 'fast-deep-equal/es6/index.js';
import reactFastCompare from 'react-fast-compare';
import {bench, describe} from 'vitest';
import * as fixtures from './fixtures/fixtures.benchmark.js';
import {isEqual, isEqualSimple} from './index.js';

function runBenchmarks(suites: fixtures.BenchmarkSuite[], functions: Record<string, (a: any, b: any) => boolean>) {
	for (const suite of suites) {
		// eslint-disable-next-line vitest/valid-title
		describe(suite.name, () => {
			for (const [fnName, fn] of Object.entries(functions)) {
				// eslint-disable-next-line vitest/valid-title
				bench(fnName, () => {
					fn(...suite.data);
				}, {time: 1000});
			}
		});
	}
}

runBenchmarks(fixtures.simple, {
	'@react-hookz/deep-compare': isEqual,
	'@react-hookz/deep-compare (simple)': isEqualSimple,
	'react-fast-compare': reactFastCompare,
	'fast-deep-equal': fastDeepEqual,
	dequal,
	'dequal (lite)': dequalLite,
});

runBenchmarks(fixtures.complex, {
	'@react-hookz/deep-compare': isEqual,
	'react-fast-compare': reactFastCompare,
	'fast-deep-equal': fastDeepEqualES6,
	dequal,
});

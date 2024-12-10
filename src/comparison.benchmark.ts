import {dequal} from 'dequal';
import fastDeepEqual from 'fast-deep-equal/es6/react.js';
import reactFastCompare from 'react-fast-compare';
import {bench, describe} from 'vitest';
import * as fixtures from './fixtures/benchmark.js';
import {isEqual} from './index.js';

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
	'@react-hookz/deep-equal': isEqual,
	'react-fast-compare': reactFastCompare,
	'fast-deep-equal': fastDeepEqual,
	dequal,
});

runBenchmarks(fixtures.complex, {
	'@react-hookz/deep-equal': isEqual,
	'react-fast-compare': reactFastCompare,
	'fast-deep-equal': fastDeepEqual,
	dequal,
});

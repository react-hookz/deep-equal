import { isEqual, isEqualSimple } from '@react-hookz/deep-equal-local';
import { dequal, dequal as dequalLite } from 'dequal';
import fastDeepEqual from 'fast-deep-equal/es6/index.js';
import reactFastCompare from 'react-fast-compare';
import * as fixtures from './fixtures.js';
import { run } from './run.js';
run(fixtures.simple, {
    dequal(data) {
        dequalLite(data[0], data[1]);
    },
    'dequal (lite)'(data) {
        dequalLite(data[0], data[1]);
    },
    '@react-hookz/deep-compare'(data) {
        isEqual(data[0], data[1]);
    },
    '@react-hookz/deep-compare (simple)'(data) {
        isEqualSimple(data[0], data[1]);
    },
    'fast-deep-equal'(data) {
        fastDeepEqual(data[0], data[1]);
    },
    'react-fast-compare'(data) {
        reactFastCompare(data[0], data[1]);
    },
});
run(fixtures.complex, {
    dequal(data) {
        dequal(data[0], data[1]);
    },
    '@react-hookz/deep-compare'(data) {
        isEqual(data[0], data[1]);
    },
    'fast-deep-equal'(data) {
        fastDeepEqual(data[0], data[1]);
    },
    'react-fast-compare'(data) {
        reactFastCompare(data[0], data[1]);
    },
});

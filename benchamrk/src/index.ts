import { dequal } from 'dequal';
import fastDeepEqual from 'fast-deep-equal/es6';
import reactFastCompare from 'react-fast-compare';
import { run } from './run';
import * as fixtures from './fixtures';
// eslint-disable-next-line import/no-relative-packages
import { isEqual } from '../../src';

// run(fixtures.simple, {
//   '@react-hookz/deep-compare': (data) => {
//     isEqual(data[0], data[1]);
//   },
//   dequal: (data) => {
//     dequal(data[0], data[1]);
//   },
//   'fast-deep-equal': (data) => {
//     fastDeepEqual(data[0], data[1]);
//   },
//   'react-fast-compare': (data) => {
//     reactFastCompare(data[0], data[1]);
//   },
// });

run(fixtures.complex, {
  '@react-hookz/deep-compare': (data) => {
    isEqual(data[0], data[1]);
  },
  dequal: (data) => {
    dequal(data[0], data[1]);
  },
  'fast-deep-equal': (data) => {
    fastDeepEqual(data[0], data[1]);
  },
  'react-fast-compare': (data) => {
    reactFastCompare(data[0], data[1]);
  },
});

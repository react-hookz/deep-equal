import { dequal } from 'dequal';
import { dequal as dequalLite } from 'dequal/lite';
import fastDeepEqual from 'fast-deep-equal/es6/react';
import reactFastCompare from 'react-fast-compare';
import { run } from './run';
import * as fixtures from './fixtures';
// eslint-disable-next-line import/no-relative-packages,import/extensions
import { isEqual, isEqualSimple } from '../..';

run(fixtures.simple, {
  dequal: (data) => {
    dequalLite(data[0], data[1]);
  },
  'dequal (lite)': (data) => {
    dequalLite(data[0], data[1]);
  },
  '@react-hookz/deep-compare': (data) => {
    isEqual(data[0], data[1]);
  },
  '@react-hookz/deep-compare (simple)': (data) => {
    isEqualSimple(data[0], data[1]);
  },
  'fast-deep-equal': (data) => {
    fastDeepEqual(data[0], data[1]);
  },
  'react-fast-compare': (data) => {
    reactFastCompare(data[0], data[1]);
  },
});

run(fixtures.complex, {
  dequal: (data) => {
    dequal(data[0], data[1]);
  },
  '@react-hookz/deep-compare': (data) => {
    isEqual(data[0], data[1]);
  },
  'fast-deep-equal': (data) => {
    // it fails on data views
    fastDeepEqual(data[0], data[1]);
  },
  'react-fast-compare': (data) => {
    reactFastCompare(data[0], data[1]);
  },
});

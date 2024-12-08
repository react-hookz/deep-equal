import {isEqualReactSimple, isEqualSimple} from '../index.js';
import data from './fixtures/simple.js';
import {runSuite} from './runner.js';

runSuite(isEqualSimple, 'isEqualSimple', data);
runSuite(isEqualReactSimple, 'isEqualSimple', data);

import { runSuite } from './runner';
import { isEqualReactSimple, isEqualSimple } from '../src';
import data from './fixtures/simple';

runSuite(isEqualSimple, 'isEqualSimple', data);
runSuite(isEqualReactSimple, 'isEqualSimple', data);

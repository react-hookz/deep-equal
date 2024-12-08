import {isEqual, isEqualReact} from '../index.js';
import complexData from './fixtures/complex.js';
import simpleData from './fixtures/simple.js';
import {runSuite} from './runner.js';

runSuite(isEqual, 'isEqual (simple data)', simpleData);
runSuite(isEqualReact, 'isEqualReact (simple data)', simpleData);

runSuite(isEqual, 'isEqual (complex data)', complexData);
runSuite(isEqualReact, 'isEqualReact (complex data)', complexData);

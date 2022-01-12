import { runSuite } from './runner';
import { isEqual, isEqualReact } from '../src';
import simpleData from './fixtures/simple';
import complexData from './fixtures/complex';

runSuite(isEqual, 'isEqual (simple data)', simpleData);
runSuite(isEqualReact, 'isEqualReact (simple data)', simpleData);

runSuite(isEqual, 'isEqual (complex data)', complexData);
runSuite(isEqualReact, 'isEqualReact (complex data)', complexData);

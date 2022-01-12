export type SuiteData = {
  description: string;
  tests: {
    description: string;
    value1: any;
    value2: any;
    equal: boolean;
    skip?: boolean;
  }[];
}[];

export function runSuite(
  equalFn: (a: any, b: any) => boolean,
  suiteName: string,
  suiteData: SuiteData
) {
  describe(suiteName, () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const suite of suiteData) {
      describe(suite.description, () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const test of suite.tests) {
          const fn = test.skip ? it.skip : it;

          fn(test.description, () => {
            expect(equalFn(test.value1, test.value2)).toBe(test.equal);
          });
          fn(`${test.description} (reverse args)`, () => {
            expect(equalFn(test.value2, test.value1)).toBe(test.equal);
          });
        }
      });
    }
  });
}

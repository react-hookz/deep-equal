export type SuiteData = Array<{
	description: string;
	tests: Array<{
		description: string;
		value1: any;
		value2: any;
		equal: boolean;
		skip?: boolean;
	}>;
}>;

export function runSuite(
	equalFn: (a: any, b: any) => boolean,
	suiteName: string,
	suiteData: SuiteData
) {
	describe(suiteName, () => {
		for (const suite of suiteData) {
			// eslint-disable-next-line @typescript-eslint/no-loop-func
			describe(suite.description, () => {
				for (const test of suite.tests) {
					const fn = test.skip ? it.skip : it;

					// eslint-disable-next-line @typescript-eslint/no-loop-func
					fn(test.description, () => {
						expect(equalFn(test.value1, test.value2)).toBe(test.equal);
					});

					// eslint-disable-next-line @typescript-eslint/no-loop-func
					fn(`${test.description} (reverse args)`, () => {
						expect(equalFn(test.value2, test.value1)).toBe(test.equal);
					});
				}
			});
		}
	});
}

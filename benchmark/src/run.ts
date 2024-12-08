import benchmark from 'benchmark';

const outputFn =
	typeof document === 'undefined' ?
		console.log :
			(text: string) => {
				queueMicrotask(() => {
					document.body.innerHTML += `${text.replace('\n', '<br/>')}<br/>`;
				});
			};

export function run<T>(
	testData: Array<{name: string; data: T}>,
	libraries: Record<string, (data: T) => void>,
) {
	for (const test of testData) {
		const suite = new benchmark.Suite(test.name, {
			onStart() {
				outputFn(`\n# ${test.name}`);
			},
			onCycle(ev: any) {
				outputFn(`  ${String(ev.target)}`);
			},
			onComplete(ev: any) {
				outputFn(` Fastest is ${ev.currentTarget.filter('fastest').map('name')}`);
			},
		});

		for (const [name, fn] of Object.entries(libraries)) {
			suite.add(name, () => {
				fn(test.data);
			});
		}

		suite.run();
	}
}

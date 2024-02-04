import benchmark from 'benchmark';
const outputFn = typeof document === 'undefined'
    ? console.log
    : (text) => {
        queueMicrotask(() => {
            document.body.innerHTML += `${text.replace('\n', '<br/>')}<br/>`;
        });
    };
export function run(testData, libraries) {
    for (const test of testData) {
        const suite = new benchmark.Suite(test.name, {
            onStart() {
                outputFn(`\n# ${test.name}`);
            },
            onCycle(ev) {
                outputFn(`  ${String(ev.target)}`);
            },
            onComplete(ev) {
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

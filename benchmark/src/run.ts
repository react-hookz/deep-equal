import { Suite } from 'benchmark';

const outputFn =
  typeof document === 'undefined'
    ? // eslint-disable-next-line no-console
      console.log
    : (text: string) => {
        queueMicrotask(() => {
          document.body.innerHTML += `${text.replace('\n', '<br/>')}<br/>`;
        });
      };

export function run<T>(
  testData: { name: string; data: T }[],
  libraries: { [name: string]: (data: T) => void }
) {
  testData.forEach((test) => {
    const suite = new Suite(test.name, {
      onStart: () => {
        outputFn(`\n# ${test.name}`);
      },
      onCycle: (ev: any) => {
        outputFn(`  ${String(ev.target)}`);
      },
      onComplete: (ev: any) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        outputFn(` Fastest is ${ev.currentTarget.filter('fastest').map('name')}`);
      },
    });

    Object.entries(libraries).forEach(([name, fn]) => {
      suite.add(name, () => fn(test.data));
    });

    suite.run();
  });
}

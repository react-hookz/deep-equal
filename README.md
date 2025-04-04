> [!CAUTION]
> __PACKAGE IS DEPRECATED AND WILL BE DETED SOON__  
> USE [@ver0/deep-equal](https://github.com/ver0-project/deep-equal) instead

<div align="center">

# @react-hookz/deep-equal

[![NPM Version](https://img.shields.io/npm/v/%40react-hookz%2Fdeep-equal?style=flat-square)](https://www.npmjs.com/package/@react-hookz/deep-equal)
[![NPM Downloads](https://img.shields.io/npm/dm/%40react-hookz%2Fdeep-equal?style=flat-square)](https://www.npmjs.com/package/@react-hookz/deep-equal)
![Dependents (via libraries.io), scoped npm package](https://img.shields.io/librariesio/dependents/npm/%40react-hookz/deep-equal?style=flat-square)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/react-hookz/deep-equal/CI.yml?style=flat-square)
![Codecov](https://img.shields.io/codecov/c/github/react-hookz/deep-equal?style=flat-square)
![NPM Type Definitions](https://img.shields.io/npm/types/%40react-hookz%2Fdeep-equal?style=flat-square)

× **[DISCORD](https://discord.gg/Fjwphtu65f)** ×

</div>

---

**The fastest deep comparator for JS/TS.**

---

## Features 🚀

- ✅ Handles ES6+ structures like `Map`, `Set`, `TypedArray`, `DataView`, and `ArrayBuffer`.
- ✅ Supports `Date`, `RegExp`, and `NaN`.
- ✅ Safe handling of React and Preact objects (no stack overflow).
- ✅ Works seamlessly with objects created via `Object.create(null)`.
- ⚠️ **Circular reference handling**:
	- **Supported**: React and Preact objects.
	- **Not supported**: Other objects (causes stack overflow).

---

## Installation 📦

It's as simple as:

```bash
npm install @react-hookz/deep-equal
# or
yarn add @react-hookz/deep-equal
```

---

## Usage 💡

### Importing

This package is distributed using the ESNext language level and ES module system. Depending on your target environment, you might need to transpile the package. Check your bundler's documentation for instructions on transpiling `node_modules`.

```typescript
import { isEqual } from '@react-hookz/deep-equal';

isEqual({ a: 1 }, { a: 1 }); // true
```

---

## Performance ⚡

**Note**: Benchmarks were conducted on specific datasets (available in the `src/fixtures` directory). Your results may vary depending on your data and use case. Running benchmarks on your dataset is recommended.

### Simple Data (non-ES6+)

<pre>
	 name                               hz     min     max    mean     p75     p99    p995    p999     rme  samples
 · @react-hookz/deep-equal  1,780,770.64  0.0005  0.7278  0.0006  0.0006  0.0010  0.0011  0.0013  ±0.18%  1780771   fastest
 · react-fast-compare       1,690,244.66  0.0005  3.2804  0.0006  0.0006  0.0010  0.0012  0.0013  ±0.65%  1690245
 · fast-deep-equal          1,663,437.00  0.0005  3.5417  0.0006  0.0006  0.0010  0.0011  0.0012  ±0.70%  1663438   slowest
 · dequal                   1,693,113.15  0.0005  3.2976  0.0006  0.0006  0.0007  0.0010  0.0012  ±0.65%  1693114
</pre>

### Complex Data (ES6+)

<pre>
	 name                               hz     min     max    mean     p75     p99    p995    p999     rme  samples
 · @react-hookz/deep-equal  1,725,589.83  0.0005  0.2565  0.0006  0.0006  0.0009  0.0010  0.0012  ±0.20%  1725590   fastest
 · react-fast-compare       1,406,227.02  0.0006  0.1635  0.0007  0.0007  0.0011  0.0014  0.0016  ±0.21%  1406228
 · fast-deep-equal          1,553,848.07  0.0005  2.7540  0.0006  0.0007  0.0008  0.0011  0.0013  ±0.57%  1553849
 · dequal                   1,026,213.59  0.0008  0.1810  0.0010  0.0010  0.0011  0.0012  0.0019  ±0.16%  1026214   slowest
</pre>

---

## Run Benchmarks Locally 🛠️

To get more detailed benchmarks for different data types, run the tests directly on your own machine:

1. Clone the repository:
	```bash
	git clone https://github.com/react-hookz/deep-equal
	cd deep-equal
	```
2. Install dependencies:
	```bash
	corepack enable
	yarn
	```
3. Run benchmarks:
	```bash
	yarn benchmark
	```

---

## Contributors

<!-- readme: collaborators,contributors,semantic-release-bot/-,lint-action/- -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/xobotyi">
                    <img src="https://avatars.githubusercontent.com/u/6178739?v=4" width="100;" alt="xobotyi"/>
                    <br />
                    <sub><b>Anton Zinovyev</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/kylemh">
                    <img src="https://avatars.githubusercontent.com/u/9523719?v=4" width="100;" alt="kylemh"/>
                    <br />
                    <sub><b>Kyle Holmberg</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/nichita-pasecinic">
                    <img src="https://avatars.githubusercontent.com/u/98735377?v=4" width="100;" alt="nichita-pasecinic"/>
                    <br />
                    <sub><b>Pasecinic Nichita</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors,semantic-release-bot/-,lint-action/- -end -->

## Related projects

- [@react-hookz/web](https://github.com/react-hookz/web) - React hooks done right, for browser and
	SSR.

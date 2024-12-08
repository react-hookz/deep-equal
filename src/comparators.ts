type EqualFn = (a: any, b: any) => boolean;

export const compareDates = (a: Date, b: Date): boolean => a.getTime() === b.getTime();

export const compareRegexps = (a: RegExp, b: RegExp): boolean =>
	a.source === b.source && a.flags === b.flags;

export const compareArrays = (a: ArrayLike<any>, b: ArrayLike<any>, equal: EqualFn): boolean => {
	if (a.length !== b.length) {
		return false;
	}

	// eslint-disable-next-line unicorn/no-for-loop
	for (let i = 0; i < a.length; i++) {
		if (!equal(a[i], b[i])) {
			return false;
		}
	}

	return true;
};

export const compareDataViews = (a: DataView, b: DataView): boolean => {
	if (a.byteLength !== b.byteLength) {
		return false;
	}

	for (let i = 0; i < a.byteLength; i++) {
		if (a.getInt8(i) !== b.getInt8(i)) {
			return false;
		}
	}

	return true;
};

export const compareMaps = (a: Map<any, any>, b: Map<any, any>, equal: EqualFn): boolean => {
	if (a.size !== b.size) {
		return false;
	}

	for (const [k, v] of a) {
		if (!b.has(k) || !equal(v, b.get(k))) {
			return false;
		}
	}

	return true;
};

export const compareSets = (a: Set<any>, b: Set<any>, equal: EqualFn): boolean => {
	if (a.size !== b.size) {
		return false;
	}

	const iterB = b.values();

	for (const i of a) {
		if (!equal(i, iterB.next().value)) {
			return false;
		}
	}

	return true;
};

const {hasOwnProperty} = Object.prototype;
const oKeys = Object.keys;

export const compareObjects = (
	a: Record<any, any>,
	b: Record<any, any>,
	equal: EqualFn,
): boolean => {
	let i;
	let length = 0;

	for (i in a) {
		if (hasOwnProperty.call(a, i)) {
			length++;

			if (!hasOwnProperty.call(b, i)) {
				return false;
			}

			if (!equal(a[i], b[i])) {
				return false;
			}
		}
	}

	return oKeys(b).length === length;
};

export const compareObjectsReact = (
	a: Record<any, any>,
	b: Record<any, any>,
	equal: EqualFn,
): boolean => {
	let i;
	let length = 0;

	for (i in a) {
		if (hasOwnProperty.call(a, i)) {
			length++;
			if (a.$$typeof && (i === '_owner' || i === '__v' || i === '__o')) {
				// In React and Preact these properties contain circular references
				// .$$typeof is just reasonable marker of element

				continue;
			}

			if (!hasOwnProperty.call(b, i)) {
				return false;
			}

			if (!equal(a[i], b[i])) {
				return false;
			}
		}
	}

	return oKeys(b).length === length;
};

const {valueOf, toString} = Object.prototype;

// eslint-disable-next-line complexity
export const isEqual = (a: any, b: any): boolean => {
	if (a === b) {
		return true;
	}

	if (typeof a === 'object' && typeof b === 'object' && Boolean(a) && Boolean(b)) {
		if (a.constructor !== b.constructor) {
			return false;
		}

		if (Array.isArray(a)) {
			const {length} = a;
			if (length !== b.length) {
				return false;
			}

			for (let i = length; i-- !== 0;) {
				if (!isEqual(a[i], b[i])) {
					return false;
				}
			}

			return true;
		}

		if (a instanceof RegExp) {
			return a.source === b.source && a.flags === b.flags;
		}

		if (a instanceof Date) {
			return a.getTime() === b.getTime();
		}

		if (a instanceof Map && b instanceof Map) {
			if (a.size !== b.size) {
				return false;
			}

			for (const entry of a) {
				if (!b.has(entry[0]) || !isEqual(entry[1], b.get(entry[0]))) {
					return false;
				}
			}

			return true;
		}

		if (a instanceof Set && b instanceof Set) {
			if (a.size !== b.size) {
				return false;
			}

			for (const value of a) {
				if (!b.has(value)) {
					return false;
				}
			}

			return true;
		}

		if (a instanceof DataView && b instanceof DataView) {
			const {byteLength} = a;

			if (byteLength !== b.byteLength) {
				return false;
			}

			for (let i = byteLength; i-- !== 0;) {
				if (a.getUint8(i) !== b.getUint8(i)) {
					return false;
				}
			}

			return true;
		}

		if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
			a = new Uint8Array(a);
			b = new Uint8Array(b);
		}

		if ((ArrayBuffer.isView(a) && ArrayBuffer.isView(b))) {
			const {length} = a as Uint8Array;
			if (length !== (b as Uint8Array).length) {
				return false;
			}

			for (let i = length; i-- !== 0;) {
				if ((a as Uint8Array)[i] !== (b as Uint8Array)[i]) {
					return false;
				}
			}

			return true;
		}

		if (a.valueOf !== valueOf && typeof a.valueOf === 'function' && typeof b.valueOf === 'function') {
			return a.valueOf() === b.valueOf();
		}

		if (a.toString !== toString && typeof a.toString === 'function' && typeof b.toString === 'function') {
			return a.toString() === b.toString();
		}

		const aKeys = Object.keys(a);
		let key;
		for (let l = aKeys.length; l-- !== 0;) {
			key = aKeys[l];
			if ((key === '_owner' || key === '__v' || key === '__o') && Object.hasOwn(a, '$$typeof')) {
				// In React and Preact these properties contain circular references
				// .$$typeof is just reasonable marker of element
				continue;
			}

			if (!Object.hasOwn(b, key) || !isEqual(a[key], b[key])) {
				return false;
			}
		}

		return Object.keys(b).length === aKeys.length;
	}

	// eslint-disable-next-line no-self-compare
	return a !== a && b !== b;
};

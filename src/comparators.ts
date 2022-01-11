type EqualFn = (a: any, b: any) => boolean;

export const compareDates = (a: Date, b: Date): boolean => a.getTime() === b.getTime();

export const compareRegexps = (a: RegExp, b: RegExp): boolean => a.toString() === b.toString();

export const compareArrays = (a: any[], b: any[], equal: EqualFn): boolean => {
  const l = a.length;
  let i = 0;

  if (l !== b.length) return false;

  while (i < l) {
    if (!equal(a[i], b[i])) return false;
    i++;
  }

  return true;
};

export const compareMaps = (a: Map<any, any>, b: Map<any, any>, equal: EqualFn): boolean => {
  if (a.size !== b.size) return false;
  const it = a.entries();
  let i: any;

  // eslint-disable-next-line no-cond-assign
  while (!(i = it.next()).done) {
    if (!equal(i.value[1], b.get(i.value[0]))) return false;
  }

  return true;
};

export const compareSets = (a: Set<any>, b: Set<any>): boolean => {
  if (a.size !== b.size) return false;
  const it = a.values();
  let i: any;

  // eslint-disable-next-line no-cond-assign
  while (!(i = it.next()).done) {
    if (!b.has(i.value)) return false;
  }

  return true;
};

export const compareDataViews = (a: DataView, b: DataView): boolean => {
  const l = a.byteLength;
  let i = 0;

  if (l !== b.byteLength) return false;

  while (i < l) {
    if (a.getInt8(i) !== b.getInt8(i)) return false;
    i++;
  }

  return true;
};

export const compareArrayBuffers = (a: ArrayLike<any>, b: ArrayLike<any>): boolean => {
  const l = a.length;
  let i = 0;

  if (l !== b.length) return false;

  while (i < l) {
    if (a[i] !== b[i]) return false;
    i++;
  }

  return true;
};

const { hasOwnProperty } = Object.prototype;

export const compareObjects = (
  a: Record<any, any>,
  b: Record<any, any>,
  equal: EqualFn
): boolean => {
  let i;

  // eslint-disable-next-line no-restricted-syntax
  for (i in a) {
    if (hasOwnProperty.call(a, i)) {
      if (!hasOwnProperty.call(b, i)) return false;

      if (!equal(a[i], b[i])) return false;
    }
  }

  return true;
};

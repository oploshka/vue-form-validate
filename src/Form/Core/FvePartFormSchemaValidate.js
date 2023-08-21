export const isPromise = (p) => {
  return p && Object.prototype.toString.call(p) === '[object Promise]';
  /*
  //
  // https://debugpointer.com/check-if-an-object-is-a-promise/
  //
  // V2
  return Boolean(value && typeof value.then === 'function');

  // V3
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) == object;
  } else {
    throw 'Promise not supported in your environment'; // Most modern browsers support Promises
  }

  // V4
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
 */
};

const isArray = Array.isArray;
export const isObject = (val) => val !== null && typeof val === 'object';

// выдернуто из vue.global.js
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(',');
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? (val) => !!map[val.toLowerCase()]
    : (val) => !!map[val];
}
const isSimpleType = /*#__PURE__*/ makeMap(
  'String,Number,Boolean,Function,Symbol,BigInt'
);
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? 'null' : '';
}
export const assertType = (value, type) => {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
    return valid;
  } else if (expectedType === 'Object') {
    valid = isObject(value);
  } else if (expectedType === 'Array') {
    valid = isArray(value);
  } else if (expectedType === 'null') {
    valid = value === null;
  } else {
    // fix null для FileClass DateTime и других объектов (возможно необходимо продублировать для Object)
    valid = (value === null) || value instanceof type;
  }
  return valid;
};

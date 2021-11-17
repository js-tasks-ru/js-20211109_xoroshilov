/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (typeof obj !== 'object') return undefined;
  if (Object.keys(obj).length === 0) return {};

  const invertedObj = {};

  for (const [key, val] of Object.entries(obj)) {
    invertedObj[val] = key;
  }

  return invertedObj;
}

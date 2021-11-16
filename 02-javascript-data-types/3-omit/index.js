/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  return Object.entries(obj).filter(([key]) => !fields.includes(key)) // only exclamation symbol diff with pick func
    .reduce((filteredObj, [key, val]) => {
      filteredObj[key] = val;
      return filteredObj;
    }, {});
};

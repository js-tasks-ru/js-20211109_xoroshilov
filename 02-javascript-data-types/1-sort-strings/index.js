/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr, param = 'asc') {
  const [...sortedArr] = arr;

  return sortedArr.sort((a, b) => {
    if (param === 'desc') {
      return b.localeCompare(a, ['ru', 'en']);
    }

    return a.localeCompare(b, ['ru', 'en'], {
      sensitivity: 'variant',
      caseFirst: 'upper'
    });
  });
}

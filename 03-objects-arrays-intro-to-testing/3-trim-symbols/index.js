/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string.length === 0 || size === 0) return '';
  if (!size) return string;

  let counter = 1;
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i + 1]) {
      counter++;
    } else {
      counter = 1;
    }

    if (size >= counter) result += string[i];
  }

  return result;
}

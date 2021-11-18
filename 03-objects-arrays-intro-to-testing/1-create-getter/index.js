/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arrOfProps = path.split('.');

  return (obj) => {
    let result = '';

    for (let prop of arrOfProps) {
      if (!obj[prop]) { return; }

      result = obj[prop];
      obj = obj[prop];
    }

    return result;
  };
}

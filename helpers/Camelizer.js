/**
 * ### Returns str as one camelized word. (See example)
 * @param {string} str string to camelize
 * @param {boolean} noCaps return string without any uppercase letters 
 * @example 
 * // returns "helloWorld"
 * camelize("Hello World")
 * @example
 * // returns "helloworld"
 * camelize("Hello World", true)
 */
export const camelize = (str, noCaps = false) => {
  let string = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
  if (noCaps) string = string.toLowerCase();
  return string.charAt(0).toLowerCase() + string.slice(1);
};

/**
 * ### Returns str as spaced words, the first of which is capitalized (see example).
 * @param {string} str string to decamelize
 * @param {boolean} allCaps return without any lowercase letters 
 * @example 
 * // returns "Hello world"
 * decamelize("helloWorld")
 * @example 
 * // returns "HELLO WORLD"
 * decamelize("helloWorld")
 */
export const decamelize = (str, allCaps = false) => {
  str = String(str);
  let newStr = str.split("");
  let capIndex = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === str.charAt(i).toUpperCase()) {
      capIndex = i;
    }
  }
  newStr[capIndex] = newStr[capIndex].toLowerCase();
  newStr[0] = newStr[0].toUpperCase();
  newStr.splice(capIndex, 0, " ");
  newStr = newStr.reduce((a, b) => a + b);
  if (allCaps) newStr = newStr.toUpperCase();
  return newStr;
};

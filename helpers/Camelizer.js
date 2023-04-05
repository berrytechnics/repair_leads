export const camelize = (str) => {
  let string = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
  return string.charAt(0).toLowerCase() + string.slice(1);
};
export const decamelize = (str) => {
  str = String(str);
  console.log(str)
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
  return newStr.reduce((a, b) => a + b);
};

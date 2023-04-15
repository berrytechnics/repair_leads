export const phone = (str) => {
  str = str
    .replaceAll(")", "")
    .replaceAll("(", "")
    .replaceAll("-", "")
    .replaceAll("+", "")
    .replaceAll(" ", "");
  if (str.length > 10) {
    const arr = str.split("");
    arr.shift();
    str = arr.join("");
  }
  return str;
};

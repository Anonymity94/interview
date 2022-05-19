/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
  const map = new Map();
  const list = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      map.set(list[i][j], i);
    }
  }

  const res = [];
  for (let i = 0; i < words.length; i++) {
    const indexSet = new Set();
    for (let j = 0; j < words[i].length; j++) {
      const wIndex = map.get(words[i][j].toLocaleLowerCase());
      indexSet.add(wIndex);
      if (indexSet.size > 1) {
        break;
      }
    }
    if (indexSet.size <= 1) {
      res.push(words[i]);
    }
  }
  return res;
};

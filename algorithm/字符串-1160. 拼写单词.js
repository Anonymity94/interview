/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  const charsMap = new Map();
  for (let i = 0; i < chars.length; i++) {
    charsMap.set(chars[i], (charsMap.get(chars[i]) || 0) + 1);
  }

  let ans = 0;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const tempMap = new Map();
    // 统计单词中词汇的数量
    for (let i = 0; i < word.length; i++) {
      tempMap.set(word[i], (tempMap.get(word[i]) || 0) + 1);
    }
    // 词汇数量和字母表进行对比
    const keys = [...tempMap.keys()];
    let isOk = true;
    for (let j = 0; j < keys.length; j++) {
      if (tempMap.get(keys[j]) > (charsMap.get(keys[j]) || 0)) {
        isOk = false;
        break;
      }
    }
    if (isOk) {
      ans += word.length;
    }
  }

  return ans;
};

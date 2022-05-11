/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  // 遍历单词
  const words = paragraph
    .replace(/[!?',;.]/g, ' ')
    .split(' ')
    .filter((el) => el);
  let map = {};

  let max = {
    word: '',
    count: 0,
  };
  // 计数
  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    // 排除禁止的单词
    if (banned.includes(w)) {
      continue;
    }
    console.log(w);
    map[w] = (map[w] || 0) + 1;

    if (map[w] > max.count) {
      max.word = w;
      max.count = map[w];
    }
  }
  console.log(map);
  console.log(max);

  return max.word;
};

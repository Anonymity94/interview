/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  const map = new Map();
  const list1 = s1.split(' ');
  const list2 = s2.split(' ');

  // 先统计第一个字符串
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], (map.get(list1[i]) || 0) + 1);
  }
  // 先统计第二个字符串
  for (let j = 0; j < list2.length; j++) {
    map.set(list2[j], (map.get(list2[j]) || 0) + 1);
  }

  const ans = [];
  // 遍历map，取数量为1的单词
  for (const [word, count] of map.entries()) {
    if (count === 1) {
      ans.push(word);
    }
  }

  return ans;
};

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    const w = s[i];
    map.set(w, (map.get(w) || 0) + 1);
  }

  const keys = [...map.keys()];
  keys.sort((a, b) => map.get(b) - map.get(a));

  let ans = 0;
  // 开始构建字符串
  for (let i = 0; i < keys.length; i++) {
    let count = map.get(keys[i]);
    while (count >= 2) {
      ans += 2;
      count -= 2;
      // 如果字符串用完了，就移除
      if (count === 0) {
        map.delete(keys[i]);
      }
    }
  }

  // 如果长度已经是奇数了，直接返回
  if (ans % 2 === 1) {
    return ans;
  }
  console.log(map);
  // 如果长度是偶数，但是还有剩余的字符，可以放在中间，所以长度还可以+1
  if (map.size > 0) {
    return ans + 1;
  }
  // 长度是偶数，但是没有其他可使用的字符串，所以长度只能保持现状
  return ans;
};

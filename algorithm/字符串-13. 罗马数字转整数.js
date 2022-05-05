/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    // 小的在左边，做减法法
    if (map[s[i]] < (map[s[i + 1]] || 0)) {
      ans += map[s[i + 1]] - map[s[i]];
      i++;
    } else {
      ans += map[s[i]];
    }
  }

  return ans;
};

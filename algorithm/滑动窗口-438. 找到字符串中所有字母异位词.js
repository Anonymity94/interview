/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let left = (right = 0);
  const res = [];

  const need = {};
  for (let i = 0; i < p.length; i++) {
    need[p[i]] = (need[p[i]] || 0) + 1;
  }

  const window = {};
  // 窗口内满足s中字符的数量
  let validCount = 0;
  while (right < s.length) {
    const char = s[right];
    right++;

    // 更新窗口内的值
    if (need[char]) {
      window[char] = (window[char] || 0) + 1;
      // 窗口内某个字符达到目标字符中的长度，满足度+1
      if (window[char] === need[char]) {
        validCount += 1;
      }
    }

    // 判断做窗口收缩
    while (right - left >= p.length) {
      if (validCount === Object.keys(need).length) {
        res.push(left);
      }
      // 否则收缩
      const del = s[left];
      left++;
      if (need[del]) {
        // 判断满足度
        if (window[del] === need[del]) {
          validCount--;
        }
        // 窗口内计数-1
        if (window.hasOwnProperty(del)) {
          window[del]--;
        }
      }
    }
  }

  return res;
};

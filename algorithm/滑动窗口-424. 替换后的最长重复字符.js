/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  let left = (right = 0);
  // 窗口内出现同一个字符出现最多的次数
  let charMaxCount = 0;
  let ans = 0;
  const window = {};
  while (right < s.length) {
    const char = s[right];
    window[char] = (window[char] || 0) + 1;
    // 找到最大的次数
    charMaxCount = Math.max(charMaxCount, window[char]);
    // 查看剩下字符的总长度，如果大于k，就缩小左窗口
    while (right - left + 1 - charMaxCount > k && left < right) {
      const leftChar = s[left];
      window[leftChar] = window[leftChar] - 1;
      left++;
    }

    ans = Math.max(right - left + 1, ans);
    right++;
  }
  return ans;
};

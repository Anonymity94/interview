/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 记录窗口
  // 记录每个字符串出现的数量
  let window = {};
  // 字符串总长度
  const n = s.length;
  // 左指针
  let left = 0;
  // 右指针
  let right = 0;
  // 记录结果
  let ans = 0;

  while (right < n) {
    // char 是即将要移入窗口的字符
    const char = s[right];
    // 右移窗口
    right++;
    // 更新窗口内的数据
    window[char] = (window[char] || 0) + 1;

    // debug
    console.log('window', left, right);

    // 判断左窗口是否要收缩
    while (window[char] > 1) {
      const leftChar = s[left];
      left++;
      // 删除左边字符
      window[leftChar]--;
    }

    // 更新答案
    ans = Math.max(ans, right - left);
  }
  return ans;
};

console.log(lengthOfLongestSubstring('pwwkew'));

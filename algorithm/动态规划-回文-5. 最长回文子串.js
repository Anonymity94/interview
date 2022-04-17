/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const n = s.length;
  const dp = new Array(n).fill(false).map(() => new Array(n).fill(false));

  let result = '';

  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      if (s[i] === s[j]) {
        // 如果2个字符的距离不超过1，那一定是
        if (j - i <= 1) {
          dp[i][j] = true;
        } else {
          // 如果距离超过1，那就判断下中间包含的区间是不是也是回文子串
          dp[i][j] = dp[i + 1][j - 1];
        }
      }

      // 更新结果
      if (dp[i][j] && j - i + 1 > result.length) {
        result = s.slice(i, j + 1);
      }
    }
  }

  return result;
};

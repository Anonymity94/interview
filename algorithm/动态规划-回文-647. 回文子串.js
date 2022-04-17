/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  const n = s.length;
  // dp[i][j] 表示下标从 i 到 j 是否是回文子串
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(false));
  let count = 0;

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

      count += dp[i][j] ? 1 : 0;
    }
  }

  return count;
};

// https://programmercarl.com/0647.%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2.html#%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92

// i 为行，j 为列
// i j 0 1 2
//   0 T
//   1
//   2

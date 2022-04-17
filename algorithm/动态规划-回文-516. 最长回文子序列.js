/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  const n = s.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));

  // dp[i][j] 表示，下标从 i 到 j 的区间内，最长回文子序列的长度
  // 所以 i = j 时的初始值为 1
  for (i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  // 为了方便递推，所以从下往上开始推导
  for (let i = n - 1; i >= 0; i--) {
    for (j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        // 上一个范围，加上新增的2个字符
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        // 取另外2个范围的最大值
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }

  // 返回整个字符中的最大值
  return dp[0][n - 1];
};

// https://programmercarl.com/0516.%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E5%BA%8F%E5%88%97.html#_516-%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E5%BA%8F%E5%88%97

// i 为行，j 为列
// i j 0 1 2
//   0
//   1
//   2

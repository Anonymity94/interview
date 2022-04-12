/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  const dp = new Array(n + 1).fill(0);
  // dp[i] 表示 整数 i 可以拆分乘积最大的值
  dp[2] = 1;
  dp[3] = 2;

  for (let i = 4; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = Math.max(
        // 当前值
        dp[i],
        // 拆分成 j 和 i-j 2个数
        (i - j) * j,
        // 拆分成 j 后，继续拆分
        dp[i - j] * j
      );
    }
  }

  return dp[n];
};

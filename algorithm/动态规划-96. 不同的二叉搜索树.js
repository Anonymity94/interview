/**
 * https://programmercarl.com/0096.%E4%B8%8D%E5%90%8C%E7%9A%84%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91.html#%E6%80%9D%E8%B7%AF
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);

  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      // dp[3] = dp[0] * dp[2] + dp[1] * dp[1] + dp[2] * dp[0]
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }

  return dp[n];
};

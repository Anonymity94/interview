/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
  // 行
  const n = grid.length;
  // 列
  const m = grid[0].length;

  // 组装 dp
  const dp = new Array(n).fill(null).map(() => new Array(m).fill(0));

  // 填充原点
  dp[0][0] = grid[0][0];

  // 填充第一行
  for (let i = 1; i < m; i++) {
    // 只有从左边过来
    dp[0][i] = dp[0][i - 1] + grid[0][i];
  }
  // 填充第一列
  for (let i = 1; i < n; i++) {
    // 只有从上边过来
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // 剩余的开始比较填充
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      // 取上边和左边的最大值
      dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
    }
  }

  return dp[n - 1][m - 1];
};

/**
 * @see https://programmercarl.com/0063.%E4%B8%8D%E5%90%8C%E8%B7%AF%E5%BE%84II.html#%E6%80%9D%E8%B7%AF
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  const dp = new Array(m).fill(0).map((l) => new Array(n).fill(0));
  // [0,0,0]
  // [0,0,0]
  // [0,0,0]

  // 第一行都是只有1种走法
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1;
  }
  // 第一列都是只有一种走法
  for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) {
    dp[0][j] = 1;
  }

  // 开始推导
  // [i][j] = 左边走法 + 上边走法
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 没有障碍时再推导
      if (obstacleGrid[i][j] === 0) {
        dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
      }
    }
  }

  // 由于数组是从 0 开始的，所以直接返回 dp[m - 1][n - 1]
  return dp[m - 1][n - 1];
};

/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {
  const rows = grid1.length;
  const cols = grid1[0].length;

  const dfs = (x, y) => {
    if (x < 0 || x >= rows || y < 0 || y >= cols) {
      return;
    }
    // 已经是海洋了
    if (grid2[x][y] === 0) {
      return;
    }
    grid2[x][y] = 0;
    dfs(x - 1, y);
    dfs(x + 1, y);
    dfs(x, y - 1);
    dfs(x, y + 1);
  };
  // 淹没不合适的陆地
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 如果2中的陆地对应1中的海洋，那直接淹没
      if (grid2[i][j] === 1 && grid1[i][j] === 0) {
        // 淹没
        dfs(i, j);
      }
    }
  }
  let ans = 0;
  // 统计陆地数量
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid2[i][j] === 1) {
        ans++;
        // 淹没这个子岛屿
        dfs(i, j);
      }
    }
  }

  return ans;
};

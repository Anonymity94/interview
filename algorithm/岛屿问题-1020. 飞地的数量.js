/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  var dfs = function (x, y) {
    if (x < 0 || x >= rows || y < 0 || y >= cols) {
      return;
    }
    if (grid[x][y] === 0) {
      return;
    }
    grid[x][y] = 0;
    // 开始淹没
    dfs(x - 1, y);
    dfs(x + 1, y);
    dfs(x, y - 1);
    dfs(x, y + 1);
  };

  // 将边界上的陆地全部淹没
  for (let j = 0; j < cols; j++) {
    // 淹没上边
    dfs(0, j);
    // 淹没下边
    dfs(rows - 1, j);
  }

  for (let i = 0; i < rows; i++) {
    // 淹没左边
    dfs(i, 0);
    // 淹没右边
    dfs(i, cols - 1);
  }

  let ans = 0;
  // 然后遍历陆地单元格，累计陆地数量
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        ans++;
      }
    }
  }

  return ans;
};

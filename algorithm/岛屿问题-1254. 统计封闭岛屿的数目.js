/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let count = 0;

  /**
   * @param {character[][]} grid 网格
   * @param {number} x 坐标
   * @param {number} y 坐标
   */
  var dfs = function (grid, x, y) {
    // 判断越界
    if (x < 0 || y < 0 || x >= rows || y >= cols) {
      return;
    }
    // 如果已经是海水，跳过
    if (grid[x][y] === 1) {
      return;
    }
    // 当前坐标设置为海水
    grid[x][y] = 1;
    // 再处理该坐标周围的4个点
    dfs(grid, x - 1, y); // 上
    dfs(grid, x + 1, y); // 下
    dfs(grid, x, y - 1); // 左
    dfs(grid, x, y + 1); // 右
  };

  for (let j = 0; j < cols; j++) {
    // 淹没上边
    dfs(grid, 0, j);
    // 淹没下边
    dfs(grid, rows - 1, j);
  }

  for (let i = 0; i < rows; i++) {
    // 淹没左边
    dfs(grid, i, 0);
    // 淹没右边
    dfs(grid, i, cols - 1);
  }

  // 开始查找封闭岛屿
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        count++;
        // 开始淹没四周
        dfs(grid, i, j);
      }
    }
  }
  return count;
};

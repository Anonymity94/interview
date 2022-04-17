/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
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
    if (grid[x][y] === '0') {
      return;
    }
    // 当前坐标设置为海水
    grid[x][y] = '0';
    // 再处理该坐标周围的4个点
    dfs(grid, x - 1, y); // 上
    dfs(grid, x + 1, y); // 下
    dfs(grid, x, y - 1); // 左
    dfs(grid, x, y + 1); // 右
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 发现陆地
      if (grid[i][j] === '1') {
        count++;
        // 将该坐标周围全部设置为海水
        dfs(grid, i, j);
      }
    }
  }

  return count;
};

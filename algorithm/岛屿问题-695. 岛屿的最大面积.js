/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let ans = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ans = Math.max(ans, dfs(i, j));
    }
  }

  function dfs(x, y) {
    if (x < 0 || x >= rows || y < 0 || y >= cols) {
      return 0;
    }
    if (grid[x][y] === 0) {
      return 0;
    }
    grid[x][y] = 0;
    return dfs(x - 1, y) + dfs(x + 1, y) + dfs(x, y - 1) + dfs(x, y + 1) + 1;
  }

  return ans;
};

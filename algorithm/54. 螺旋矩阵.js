/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let rows = matrix.length;
  let cols = matrix[0].length;

  let top = 0;
  let left = 0;
  let right = cols - 1;
  let bottom = rows - 1;

  let result = [];

  // 遍历整个矩阵
  while (result.length < rows * cols) {
    // 顶部，从左往右
    if (top <= bottom) {
      for (let i = left; i <= right; i++) {
        // 行不变，列变
        result.push(matrix[top][i]);
      }
      // 上边界下移一位
      top++;
    }
    // 右边，从上到下
    if (left <= right) {
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][right]);
      }
      right--;
    }
    // 下边，从右往左
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }
    // 左边，从下往上
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
};

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let rows = n;
  let cols = n;

  let top = 0;
  let left = 0;
  let right = cols - 1;
  let bottom = rows - 1;

  let matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));

  // 下一个要填充的数字
  let number = 1;

  // 遍历整个矩阵
  while (number <= rows * cols) {
    // 顶部，从左往右
    if (top <= bottom) {
      for (let i = left; i <= right; i++) {
        // 行不变，列变
        matrix[top][i] = number++;
      }
      // 上边界下移一位
      top++;
    }
    // 右边，从上到下
    if (left <= right) {
      for (let i = top; i <= bottom; i++) {
        matrix[i][right] = number++;
      }
      right--;
    }
    // 下边，从右往左
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        matrix[bottom][i] = number++;
      }
      bottom--;
    }
    // 左边，从下往上
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        matrix[i][left] = number++;
      }
      left++;
    }
  }

  return matrix;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length;

  // 记录下标为 i 时，左侧柱子的最高高度
  const leftMax = [];
  // 记录下标为 i 时，右侧柱子的最高高度
  const rightMax = [];

  // 统计左侧高度
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    // 从左往右填充
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // 统计右侧高度
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    // 从右往左填充
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // 求和
  let sum = 0;
  for (let i = 0; i < n; i++) {
    // 找到左右2个最矮的（木桶效应）
    const diff = Math.min(leftMax[i], rightMax[i]) - height[i];
    if (diff > 0) {
      sum += diff;
    }
  }

  return sum;
};

// https://programmercarl.com/0042.%E6%8E%A5%E9%9B%A8%E6%B0%B4.html

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // 最大值
  let max = -Infinity;
  // 一个连续子数组的区间和
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum = sum + nums[i];
    if (sum > max) {
      max = sum;
    }
    // 排除负数，重新开始计算区间
    if (sum <= 0) {
      sum = 0;
    }
  }

  return max;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let left = 0;

  let sum = 0;
  let avgMax = -Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    if (right - left + 1 === k) {
      // 计算均值
      avgMax = Math.max(avgMax, sum / k);
    }
    // 左窗口收缩
    if (right >= k - 1) {
      sum -= nums[left];
      left++;
    }
  }

  return avgMax;
};

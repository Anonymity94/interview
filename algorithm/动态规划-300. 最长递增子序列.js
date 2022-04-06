/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length;
  // dp[i] = 包含下标 i 的最长上升序列的长度
  const dp = new Array(n).fill(1);
  // 最大的子序列长度
  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // 挨个对比，计算数量
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    // 记录每一轮的最大值
    if (dp[i] > result) {
      result = dp[i];
    }
  }

  return result;
};

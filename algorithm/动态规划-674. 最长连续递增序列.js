/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  if (nums.length === 1) {
    return 1;
  }

  // 第i个位置，联系递增序列长度
  const dp = new Array(nums.length).fill(1);

  let result = 0;
  for (let i = 1; i < nums.length; i++) {
    // 当前数字 > 前一个数字，在上个递增长度上 +1
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    }

    result = Math.max(dp[i], result);
  }

  return result;
};

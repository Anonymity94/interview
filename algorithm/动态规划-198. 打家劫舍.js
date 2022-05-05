/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const dp = new Array(nums.length).fill(0);
  // dp[i] 表示到下标为i的房屋时，能偷盗的最高金额
  dp[0] = nums[0];
  // 长度可能为1，所以保护一下，给个默认值0
  dp[1] = Math.max(nums[0], nums[1] || 0);

  for (let i = 2; i < nums.length; i++) {
    // 偷第i个房屋：dp[i - 2] + nums[i]
    // 不偷第i个房屋：这时候金额等于上次偷盗的金额
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp.at(-1);
};

// https://programmercarl.com/0198.%E6%89%93%E5%AE%B6%E5%8A%AB%E8%88%8D.html

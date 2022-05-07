/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  return Math.max(doRob([...nums].slice(0, -1)), doRob([...nums].slice(1)));
};

/**
 * @param {number[]} nums
 * @param {number} start 偷窃的开始下标
 * @param {number} end 偷窃的结束下标
 * @return {number}
 */
var doRob = function (nums) {
  console.log(nums);
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

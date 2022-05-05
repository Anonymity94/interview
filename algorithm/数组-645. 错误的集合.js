/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  const n = nums.length;
  const ans = [];
  // 统计出现的次数
  const temp = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const item = nums[i];
    temp[item] += 1;
  }

  for (let j = 1; j <= n; j++) {
    // 重复的数字
    if (temp[j] === 2) {
      ans[0] = j;
    }
    // 缺失的数字
    if (temp[j] === 0) {
      ans[1] = j;
    }
  }

  return ans;
};

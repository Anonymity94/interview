/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
  // 根据绝对值大小倒序
  nums.sort((a, b) => {
    return Math.abs(b) - Math.abs(a);
  });

  // 先把负数转成正数
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0 && k > 0) {
      nums[i] *= -1;
      k--;
    }
  }

  // 如果还有 k 还有次数，就把最小值反复翻转
  while (k > 0) {
    nums[nums.length - 1] *= -1;
    k--;
  }

  // 数组求和
  return nums.reduce((sum, item) => (sum += item), 0);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  // 方法一，普通遍历
  let index = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[index]) {
      index = i;
    }
  }
  return index;
};

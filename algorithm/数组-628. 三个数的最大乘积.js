/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
  // 找到最大的3个数
  let max1 = -Infinity;
  let max2 = -Infinity;
  let max3 = -Infinity;
  // 最小的2个数
  let min1 = Infinity;
  let min2 = Infinity;

  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (item > max1) {
      max3 = max2;
      max2 = max1;
      max1 = item;
    } else if (item > max2) {
      max3 = max2;
      max2 = item;
    } else if (item > max3) {
      max3 = item;
    }

    if (item < min1) {
      min2 = min1;
      min1 = item;
    } else if (item < min2) {
      min2 = item;
    }
  }

  return Math.max(max1 * max2 * max3, max1 * min2 * min1);
};

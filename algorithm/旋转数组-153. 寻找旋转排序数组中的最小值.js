/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  // 左闭右开
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < nums[right]) {
      // 在左边
      right = mid;
    } else {
      // 在右边
      left = mid + 1;
    }
  }

  return nums[left];
};

/**
 * 左闭右闭
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  return right + 1;
};

/**
 * 左闭右开
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  // 左闭右开
  // 所以这里是不再 -1
  let right = nums.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      // [mid + 1, right)
      left = mid + 1;
    } else if (nums[mid] > target) {
      // [left, mid)
      right = mid;
    } else {
      return mid;
    }
  }

  return right;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let left = searchLeft(nums, target);
  let right = searchRight(nums, target);

  return [left, right];
};

var searchLeft = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] >= target) {
      // 往左找
      right = mid - 1;
    } else if (nums[mid] < target) {
      // 往右找
      left = mid + 1;
    }
  }

  return nums[left] === target ? left : -1;
};
var searchRight = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] <= target) {
      left = mid + 1;
    }
  }

  return nums[right] === target ? right : -1;
};

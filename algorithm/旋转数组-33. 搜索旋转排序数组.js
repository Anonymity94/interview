/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // 计算中间下标
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    // 如果左侧是升序
    if (nums[mid] >= nums[left]) {
      // 再判断目标值的区间
      if (nums[left] <= target && target < nums[mid]) {
        // 左边
        right = mid - 1;
      } else {
        // 右边
        left = mid + 1;
      }
    } else {
      // 右边是升序的
      if (nums[mid] < target && target <= nums[right]) {
        // 在右边
        left = mid + 1;
      } else {
        // 在左边
        right = mid - 1;
      }
    }
  }

  return -1;
};

// https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/33-sou-suo-xuan-zhuan-pai-xu-shu-zu-by-d-l1m9/

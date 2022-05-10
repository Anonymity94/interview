/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const number = nums[i];
    if (map.has(number) && i - map.get(number) <= k) {
      return true;
    }
    map.set(number, i);
  }
  return false;
};

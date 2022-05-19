/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const n = nums.length;
  if (n <= 2) {
    return n;
  }
  let left = 2;
  let right = 2;
  while (right < n) {
    if (nums[left - 2] !== nums[right]) {
      nums[left] = nums[right];
      left++;
    }
    right++;
  }
  return left;
};

// https://leetcode-cn.com/problems/move-zeroes/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let point = 0;
  for (let index = 0; index < nums.length; index++) {
    const el = nums[index];
    if (el !== 0) {
      nums[point++] = el;
    }
  }

  for (let index = point; index < nums.length; index++) {
    nums[index] = 0;
  }
};

const nums = [0];
moveZeroes(nums);

var moveZeroes2 = function (nums) {
  let point = 0;
  for (let index = 0; index < nums.length; index++) {
    const el = nums[index];
    if (el !== 0) {
      const temp = nums[point];
      nums[point++] = el;
      nums[index] = temp;
    }
  }
  console.log(nums);
};

moveZeroes2([1]);
moveZeroes2([9]);
moveZeroes2([0, 1, 0, 3, 12]);

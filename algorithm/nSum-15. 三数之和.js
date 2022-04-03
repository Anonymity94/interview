/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const length = nums.length;
  const result = [];
  // 先升序排序
  nums.sort((a, b) => a - b);
  for (let i = 0; i < length; i++) {
    // 求两数之和
    const twoSumResult = twoSum(nums, i + 1, 0 - nums[i]);
    if (twoSumResult.length > 0) {
      // 将两数之和和这个数合并起来
      result.push(...twoSumResult.map((item) => [...item, nums[i]]));
    }
    // 跳过重复的数字
    while (i < length - 1 && nums[i] === nums[i + 1]) {
      i++;
    }
  }

  return result;
};

/**
 * @param {number[]} nums
 * @param {number} start
 * @param {number} target
 * @return {number[][]}
 */
var twoSum = function (nums, start, target) {
  let left = start;
  let right = nums.length - 1;
  let res = [];
  while (left < right) {
    // 左边的数字
    const ln = nums[left];
    // 右边的数字
    const rn = nums[right];
    // 两数之和
    const sum = ln + rn;
    // 两数之和小于目标值，左指针++
    if (sum < target) {
      // 排除重复的值
      while (left < right && nums[left] === ln) {
        left++;
      }
    } else if (sum > target) {
      // 两数之和大于目标值，右指针--
      // 排除重复的值
      while (left < right && nums[right] === rn) {
        right--;
      }
    } else {
      // 记录内容值
      res.push([nums[left], nums[right]]);
      // 排除重复的值
      while (left < right && nums[left] === ln) {
        left++;
      }
      while (left < right && nums[right] === rn) {
        right--;
      }
    }
  }
  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

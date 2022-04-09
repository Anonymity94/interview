/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  let res = [];
  while (left <= right) {
    const num1 = nums[left] ** 2;
    const num2 = nums[right] ** 2;
    // 每次将大的数添加到前面
    if (num1 <= num2) {
      res.unshift(num2);
      // 右边指针向左移动
      right--;
    } else {
      res.unshift(num1);
      left++;
    }
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
  let result = 1;
  // 前一个的差值（正数表示向上，负数表示向下）
  let prevDiff = 0;
  let curDiff = 0;

  for (let i = 1; i < nums.length; i++) {
    curDiff = nums[i] - nums[i - 1];

    if ((curDiff > 0 && prevDiff <= 0) || (curDiff < 0 && prevDiff >= 0)) {
      result += 1;
      prevDiff = curDiff;
    }
  }

  return result;
};

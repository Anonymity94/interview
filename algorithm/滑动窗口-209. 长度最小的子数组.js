/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  // 字符串总长度
  const n = nums.length;
  // 左指针
  let left = 0;
  // 右指针
  let right = 0;
  // 当前窗口连续子数组的和
  let sum = 0;
  // 满足条件的子数组的最小长度
  let strLength = Infinity;

  while (right < n) {
    // 计算总和
    sum += nums[right];

    // 左窗口收缩
    while (sum >= target) {
      // 计算最小长度
      strLength = Math.min(strLength, right - left + 1);
      // 左窗口收缩
      sum -= nums[left];
      left++;
    }
    // 右指针继续往前走
    right++;
  }
  return strLength === Infinity ? 0 : strLength;
};

console.log(minSubArrayLen(4, [1, 4, 4]));

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const result = [];

  // 单调队列，保存数组的下标
  // 永远保持队列首部的值是大的
  const stack = [];

  // 左指针
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    // 如果队列不为空，且队尾的数值小于当前值
    // 就删除这个队尾
    while (stack.length > 0 && nums[stack.at(-1)] < nums[right]) {
      stack.pop();
    }

    // 队列为空后，或者是队列中的值都大于当前值
    // 记录右侧的下标
    stack.push(right);

    // 判断窗口的的形成
    // right 下标从 0 开始
    // 当超过 k-1 后形成窗口
    if (right >= k - 1) {
      // 判断队头的下标是否在窗口内
      // 不在窗口内就移除
      if (stack[0] < left) {
        stack.shift();
      }
      // 这时候，队头一定是当前窗口的最大值
      result.push(nums[stack[0]]);
      // 左指针随右指针向前滚动
      left++;
    }
  }

  return result;
};


// https://leetcode-cn.com/problems/sliding-window-maximum/solution/dong-hua-yan-shi-dan-diao-dui-lie-239hua-hc5u/
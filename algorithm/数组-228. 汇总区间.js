/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  let ans = [];
  for (let i = 0; i < nums.length; i++) {
    let merged = false;
    let number = nums[i];
    if (ans.length > 0) {
      const [, right] = ans.at(-1);
      // 因为是有序的，所以直接判断新的数字是否和最后一个结果紧挨着即可
      if (number === right + 1) {
        ans[ans.length - 1][1] = number;
        merged = true;
      }
    }
    // 如果没有被合并，就创建新的区间
    if (!merged) {
      ans.push([number, number]);
    }
  }

  // 返回结果
  return ans.map(([left, right]) => {
    if (left === right) {
      return String(left);
    }
    return left + '->' + right;
  });
};

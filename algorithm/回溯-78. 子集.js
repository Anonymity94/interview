/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];

  /**
   * @param {number} startIndex
   * @param {number[]} path
   */
  var backtrack = function (startIndex, path) {
    // 记录结果
    result.push([...path]);
    // 下标越界时终止
    if (startIndex >= nums.length) {
      return;
    }

    for (let i = startIndex; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
};

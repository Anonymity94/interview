/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  const result = [];
  /**
   * @param {number} startIndex
   * @param {number[]} path
   */
  var backtrack = function (startIndex, path) {
    if (path.length >= 2) {
      // 记录结果
      result.push([...path]);
    }

    // 下标越界时终止
    if (startIndex >= nums.length) {
      return;
    }

    const useMap = {};

    for (let i = startIndex; i < nums.length; i++) {
      // 排除比 path 最后一个元素还小的值
      if (path.at(-1) > nums[i]) {
        continue;
      }
      // 排除重复的
      if (useMap[nums[i]]) {
        continue;
      }

      useMap[nums[i]] = true;
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
};

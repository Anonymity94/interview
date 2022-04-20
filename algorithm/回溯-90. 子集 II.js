/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const result = [];

  // 先排序
  nums.sort();

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
      // 如果当前下标之后出现相同的，就跳过重复的字符
      if (i > startIndex && nums[i] === nums[i - 1]) {
        continue;
      }

      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
};

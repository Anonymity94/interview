/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const result = [];

  // 排序
  candidates.sort();

  /**
   * @param {number} startIndex 数组开始的下标
   * @param {number[]} path 当前选中路径
   * @param {number} sum 当前选中路径的总和
   */
  var backtrack = function (startIndex, path, sum) {
    if (sum > target) {
      return;
    }
    if (sum === target) {
      result.push([...path]);
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      const num = candidates[i];
      // 当前数大于剩余值或者是大于总和目标值时
      // 直接跳过
      if (num > target - sum || num > target) {
        continue;
      }

      // i 之后的相同的跳过
      // 保证每个数字只能用一次
      if (i > startIndex && candidates[i] === candidates[i - 1]) {
        continue;
      }
      path.push(num);
      backtrack(i + 1, path, sum + num);
      path.pop();
    }
  };

  backtrack(0, [], 0);

  return result;
};

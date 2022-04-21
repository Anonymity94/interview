/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const n = nums.length;
  const result = [];
  // 标记数组下标是否被使用
  const usedList = new Array(n).fill(false);

  // 排序
  nums.sort();
  /**
   * @param {number[]} path
   */
  var backtrack = function (path) {
    console.log(path);
    // 记录结果
    if (path.length === n) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < n; i++) {
      // 如果2个元素重复，并且上一个未使用，说明是同层重复，需要剪支
      if (i > 0 && nums[i] === nums[i - 1] && usedList[i - 1] === false) {
        continue;
      }
      // 树支上排除重复使用的
      if (usedList[i]) {
        continue;
      }
      usedList[i] = true;
      path.push(nums[i]);
      backtrack(path);
      usedList[i] = false;
      path.pop();
    }
  };
  backtrack([]);
  return result;
};

// https://programmercarl.com/0047.%E5%85%A8%E6%8E%92%E5%88%97II.html#_47-%E5%85%A8%E6%8E%92%E5%88%97-ii
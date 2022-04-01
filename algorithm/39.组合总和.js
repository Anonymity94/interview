/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const ans = [];
  // 当前选择是索引
  // 已经组合的列表为 combine
  // 当前组合的和
  const backtrack = (start, combine, sum) => {
    console.log(start, combine, sum);
    // 越界，超出总和，不合适，结束递归
    if (sum > target) {
      return;
    }
    if (sum === target) {
      // 加入结果
      ans.push([...combine]);
      // 找到一个结果，结束
      return;
    }
    // 枚举当前可选择的数，从start开始
    for (let i = start; i < candidates.length; i++) {
      // 选择这个数
      combine.push(candidates[i]);
      // 基于这个数继续选择
      backtrack(i, combine, sum + candidates[i]);
      // 恢复原状
      combine.pop();
    }
  };

  backtrack(0, [], 0);

  return ans;
};

console.log(combinationSum([2, 3, 6, 7], 7));

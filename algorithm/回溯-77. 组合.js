/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];
  const path = [];
  var backtrack = function (startIndex) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    // 剪枝，依据当前 path 的数量，缩小范围
    for (let i = startIndex; i <= n - (k - path.length) + 1; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(1);
  return result;
};

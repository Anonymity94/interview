/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const ans = [];

  /**
   * @param {number} leftCount 可用的左括号数量
   * @param {number} rightCount 可用的右括号数量
   * @param {string[]} path 当前路径
   */
  const backtrack = function (leftCount, rightCount, path) {
    if (leftCount < 0 || rightCount < 0) {
      return;
    }
    // 因为先放左括号
    // 所以允许左括号比右括号少
    // 但是出现左括号多的时候，说明是不合适的
    if (rightCount < leftCount) {
      return;
    }

    if (leftCount === 0 && rightCount === 0) {
      ans.push(path.join(''));
      return;
    }

    // 放左括号
    path.push('(');
    backtrack(leftCount - 1, rightCount, path);
    path.pop();

    // 放右括号
    path.push(')');
    backtrack(leftCount, rightCount - 1, path);
    path.pop();
  };

  backtrack(n, n, []);

  return ans;
};

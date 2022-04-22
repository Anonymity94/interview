/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  // 倒序排序
  g.sort((a, b) => b - a);
  s.sort((a, b) => b - a);

  // 结果数量
  let result = 0;
  // 从最大的饼干开始投喂
  let index = 0;

  // 大饼干先给能吃的熊孩子
  for (let i = 0; i < g.length; i++) {
    if (index < s.length && s[index] >= g[i]) {
      index++;
      result++;
    }
  }

  return result;
};

// https://programmercarl.com/0455.%E5%88%86%E5%8F%91%E9%A5%BC%E5%B9%B2.html#%E6%80%9D%E8%B7%AF

/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const n = ratings.length;
  // 每个孩子先分1个
  const dp = new Array(ratings.length).fill(1);

  // 从前往后
  for (let i = 1; i < n; i++) {
    // 相邻的孩子，给分数高的加1
    if (ratings[i] > ratings[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    }
  }

  // 从后往前
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      dp[i] = Math.max(dp[i], dp[i + 1] + 1);
    }
  }

  console.log(dp);
  return dp.reduce((sum, cur) => (sum += cur), 0);
};

// https://programmercarl.com/0135.%E5%88%86%E5%8F%91%E7%B3%96%E6%9E%9C.html#%E6%80%9D%E8%B7%AF
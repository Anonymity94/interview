/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  const m = nums2.length;
  const n = nums1.length;
  // num1 当列，num2 当行
  const dp = new Array(m + 1)
    .fill(undefined)
    .map(() => new Array(n + 1).fill(0));
  dp[0][0] = 0;

  let result = 0;
  // 由于 dp[0][0] 是初始化数据，没有含义，所以下标整体往后推1，所以这里是 <=
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums2[i - 1] === nums1[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
      result = Math.max(dp[i][j], result);
    }
  }

  return result;
};

// https://programmercarl.com/0718.%E6%9C%80%E9%95%BF%E9%87%8D%E5%A4%8D%E5%AD%90%E6%95%B0%E7%BB%84.html

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  let arr = [];
  for (let i = 0; i <= n; i++) {
    arr[i] = hammingWeight(i);
  }
  return arr;
};

/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let ans = 0;
  while (n !== 0) {
    // 消除最低位的1
    n = n & (n - 1);
    ans++;
  }
  return ans;
};

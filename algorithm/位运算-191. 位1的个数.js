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

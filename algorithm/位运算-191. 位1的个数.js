/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    // 查看最后一位是0还是1
    ans += (n >> i) & 1;
  }

  return ans;
};

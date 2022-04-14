/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
  return accounts.reduce((max, account) => {
    const sum = account.reduce((a, b) => a + b, 0);
    if (sum > max) {
      max = sum;
    }
    return max;
  }, 0);
};

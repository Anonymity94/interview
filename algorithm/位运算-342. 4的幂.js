/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  return n > 0 && n % 3 === 1 && (n & (n - 1)) === 0;
};

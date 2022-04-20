/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  let cache = {};
  let temp = n;

  while (true) {
    let sum = getSum(temp);
    if (sum === 1) {
      return true;
    }
    // 进入循环
    if (cache[sum]) {
      return false;
    }

    cache[sum] = true;
    temp = sum;
  }
};

/**
 * @param {number} num
 * @return {number}
 */
var getSum = function (num) {
  let sum = 0;
  while (num) {
    sum += (num % 10) ** 2;
    num = Math.floor(num / 10);
  }
  return sum;
};

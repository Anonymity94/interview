/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  let a = 0;
  while (a * a <= c) {
    const diff = c - a * a;
    // 开方
    const b = Math.sqrt(diff);
    // 判断是否是个整数
    if (b === Math.floor(b)) {
      return true;
    }
    a++;
  }
  return false;
};

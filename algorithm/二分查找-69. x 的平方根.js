/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x <= 1) {
    return x;
  }
  let left = 1;
  // 向上取整
  let right = Math.round(x / 2);

  // 二分查找，左闭右闭
  while (left <= right) {
    // 寻找中间的数字，并向上取整
    let mid = Math.round((right + left) / 2);
    // 计算乘积
    let s = mid * mid;
    // 大于目标值，就查左边
    if (s > x) {
      right = mid - 1;
    } else if (s < x) {
      // 小于目标值，就查左边
      left = mid + 1;
    } else {
      // 刚好等于目标值，直接返回
      return mid;
    }
  }

  // 退出循环时 left 大于 right
  // 所以返回右边的指针
  return right;
};

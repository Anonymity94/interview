/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    // 右侧是递增的
    if (numbers[mid] < numbers[right]) {
      right = mid;
    } else if (numbers[mid] > numbers[right]) {
      // 最小值在2个之间
      left = mid + 1;
    } else {
      // 左右端点值相同
      // 缩小右侧边界
      right -= 1;
    }
  }

  return numbers[left];
};

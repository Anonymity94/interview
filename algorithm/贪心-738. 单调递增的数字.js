/**
 * @param {number} n
 * @return {number}
 */
var monotoneIncreasingDigits = function (n) {
  // 切分成数字数组
  // 332 => [3,3,2]
  const arr = String(n)
    .split('')
    .map((el) => +el);
  // 游标
  let point = arr.length + 1;
  for (let i = arr.length - 1; i > 0; i--) {
    console.log(arr[i]);
    console.log(arr[i - 1]);
    // 如果后一位比前一位大
    if (arr[i] < arr[i - 1]) {
      arr[i] = 9;
      arr[i - 1] = arr[i - 1] > 0 ? arr[i - 1] - 1 : 9;
      // 记录游标
      point = i;
    }
  }

  // 100 => 90
  // 这时候需要把游标往后的全部填充为0
  for (let i = point; i < arr.length; i++) {
    arr[i] = 9;
  }

  return +arr.join('');
};

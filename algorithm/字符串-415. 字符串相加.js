/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  // 将2个数补齐为长度相同
  const maxLength = Math.max(num1.length, num2.length);
  num1 = num1.padStart(maxLength, '0');
  num2 = num2.padStart(maxLength, '0');

  // 指针
  let p = maxLength - 1;
  // 结果
  let result = '';
  // 进位标识
  let flag = 0;

  while (p >= 0) {
    const sum = flag + Number(num1[p]) + Number(num2[p]);

    // 判断进位
    if (sum >= 10) {
      result = String(sum - 10) + result;
      flag = 1;
    } else {
      result = String(sum) + result;
      flag = 0;
    }

    // 左移
    p--;
  }

  if (flag === 1) {
    result = String(flag) + result;
  }

  return result;
};

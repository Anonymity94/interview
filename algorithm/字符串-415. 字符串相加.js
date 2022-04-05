// https://leetcode-cn.com/problems/add-strings

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  // 进位标识
  let flag = 0;
  let p1 = num1.length - 1;
  let p2 = num2.length - 1;

  let result = "";

  while (p1 >= 0 || p2 >= 0) {
    let total = flag;
    if (p1 >= 0) {
      total += Number(num1[p1]);
    }
    if (p2 >= 0) {
      total += Number(num2[p2]);
    }
    if (total >= 10) {
      result = String(total - 10) + result;
      flag = 1;
    } else {
      result = String(total) + result;
      flag = 0;
    }
    if (p1 !== -1) {
      p1--;
    }
    if (p2 !== -1) {
      p2--;
    }
  }
  return result;
};

addStrings("11", "123");

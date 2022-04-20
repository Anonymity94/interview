/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) {
    return [];
  }
  const digitMap = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  };

  const nums = [];
  digits.split('').forEach((item) => {
    nums.push(digitMap[item].split(''));
  });

  const n = digits.length;
  const result = [];
  const path = [];

  /**
   * @param {number} digit
   */
  var backtrave = function (startIndex) {
    if (path.length === n) {
      result.push(path.join(''));
      return;
    }

    const row = nums[startIndex];
    for (let i = 0; i < row.length; i++) {
      path.push(row[i]);
      backtrave(startIndex + 1);
      path.pop();
    }
  };

  backtrave(0);
  return result;
};

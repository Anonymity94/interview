/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  if (s.length === 1) {
    return false;
  }

  const n = s.length;
  const mid = Math.floor(n / 2);
  // 判断前一半，如果前一半都不满足条件
  // 超过一半后，前面的字符长度>后面的字符长度，必然不能重复构成
  for (let i = 0; i < mid; i++) {
    let str = s.slice(0, i + 1);
    // s的总长度不是改字符串的整倍数，不能重复
    if (n % str.length !== 0) {
      continue;
    }
    // 判断s的结尾是否是该字符
    if (s.slice(n - str.length) !== str) {
      continue;
    }

    // 判断是否能重复
    const count = n / str.length;
    if (str.repeat(count) === s) {
      return true;
    }
  }

  return false;
};

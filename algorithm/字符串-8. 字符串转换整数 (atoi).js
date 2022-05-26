/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  // 先排除开头的空格
  let index = 0;
  while (index < s.length && s[index] === ' ') {
    index++;
  }
  console.log(index);
  let sign = 1;

  // 判断符号位
  if (s[index] === '+' || s[index] === '-') {
    sign = s[index] === '+' ? 1 : -1;
    index++;
  }

  const MAX = 2 ** 31 - 1;
  const MIN = -(2 ** 31);
  let ans = 0;
  for (let i = index; i < s.length; i++) {
    if (!/[0-9]/.test(s[i])) {
      break;
    }
    ans = ans * 10 + Number(s[i]);
  }
  ans *= sign;
  if (ans > MAX) {
    return MAX;
  }
  if (ans < MIN) {
    return MIN;
  }
  return ans;
};

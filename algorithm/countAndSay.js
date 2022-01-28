// https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/xnpvdm/

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  if (n === 1) {
    return "1";
  }

  const prevString = countAndSay(n - 1);

  let result = "";

  let count = 0;
  let str = prevString.charAt(0);
  for (let i = 0; i < prevString.length; i++) {
    // 如果字符相同，计数+1,判断下一个
    if (prevString[i] === str) {
      count++;
      continue;
    }

    // 字符和当前的字符不同，停止当前字符计数
    result += `${count}${str}`;
    str = prevString[i];
    count = 1;
  }

  // 退出的时候也要记录上
  return (result += `${count}${str}`);
};

console.log(countAndSay(6));

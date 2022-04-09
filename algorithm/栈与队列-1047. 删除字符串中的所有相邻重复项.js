/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
  let index = 0;
  const stack = [];
  while (index < s.length) {
    if (stack.length === 0) {
      stack.push(s[index]);
    } else {
      // 取栈顶的进行比较
      const first = stack[stack.length - 1];
      // 如果相同，就弹出栈顶，消消乐
      if (s[index] === first) {
        // 弹出最后一个
        stack.pop();
      } else {
        // 如果不同，继续入栈
        stack.push(s[index]);
      }
    }
    index++;
  }

  return stack.join('');
};

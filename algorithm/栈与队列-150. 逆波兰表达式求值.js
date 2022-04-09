/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];
  let index = 0;
  while (index < tokens.length) {
    const token = tokens[index];
    // 是运算符号，取栈顶2个数字进行运算
    if (['+', '-', '*', '/'].includes(token)) {
      const num1 = Number(stack.pop());
      const num2 = Number(stack.pop());
      console.log(num2, token, num1);
      if (token === '+') {
        stack.push(num2 + num1);
      }
      if (token === '-') {
        stack.push(num2 - num1);
      }
      if (token === '*') {
        stack.push(num2 * num1);
      }
      if (token === '/') {
        // 计算取整
        let r = num2 / num1;
        r = r < 0 ? Math.ceil(r) : Math.floor(r);
        // -0 => 0
        if (Math.abs(r) === 0) {
          r = 0;
        }
        stack.push(r);
      }
    } else {
      // 是数字，直接入栈
      stack.push(token);
    }
    index++;
  }

  return stack.pop();
};

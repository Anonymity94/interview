// 给定一个只包含三种字符的字符串：（ ，） 和 *，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则：

// 任何左括号 ( 必须有相应的右括号 )。
// 任何右括号 ) 必须有相应的左括号 ( 。
// 左括号 ( 必须在对应的右括号之前 )。
// * 可以被视为单个右括号 ) ，或单个左括号 ( ，或一个空字符串。
// 一个空字符串也被视为有效字符串。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-parenthesis-string
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  // 存放左括号下标的栈
  let leftStack = [];
  // 存放星号下标的栈
  let xingStack = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // 碰到左括号
    if (char === '(') {
      leftStack.push(i);
      continue;
    }
    // 碰到星号
    if (char === '*') {
      xingStack.push(i);
      continue;
    }
    // 碰到右括号，开始匹配
    // 先匹配左括号
    if (leftStack.length) {
      leftStack.pop();
      continue;
    }
    // 再匹配星号
    if (xingStack.length) {
      xingStack.pop();
      continue;
    }
    // 都匹配不上，无效括号
    return false;
  }
  // 检查是否还有剩余的左括号、星号，此时挨个判断下标
  // 星号可以当做右括号，所以当左括号的下标大于星号的坐标时，无效括号
  while (leftStack.length > 0 && xingStack.length > 0) {
    if (leftStack.pop() > xingStack.pop()) {
      return false;
    }
  }
  // 由于星号可以当做空字符串，所以星号栈有没有内容不重要
  // 最后只要没有左括号，就是有效的
  return leftStack.length === 0;
};

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const pathList = path.split('/');
  const stack = [];
  for (let i = 0; i < pathList.length; i++) {
    const item = pathList[i];
    // 不需要切换目录
    if (item === '' || item === '.') {
      continue;
    }
    if (item === '..') {
      // 切换到上一个目录
      if (stack.length > 0) {
        stack.pop();
      }
      continue;
    }
    stack.push(item);
  }

  let ans = '';
  while (stack.length) {
    ans = '/' + stack.pop() + ans;
  }

  return ans || '/';
};

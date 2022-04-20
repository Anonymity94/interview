/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const n = s.length;
  const result = [];

  /**
   * @param {number} startIndex
   * @param {string[]} path
   */
  var backtrack = function (startIndex, path) {
    const len = path.length;
    // 长度超出
    if (len > 4) {
      return;
    }
    //
    if (path.length === 4 && startIndex === n) {
      result.push(path.join('.'));
      return;
    }

    for (let i = startIndex; i < n; i++) {
      // 当前截取的字符串
      const str = s.slice(startIndex, i + 1);
      // 判断是否符合 IP 的要求
      if (str.length > 3 || +str > 255) {
        break;
      }
      // 长度超过1时，开头不能是0
      if (str.length > 1 && str[0] === '0') {
        break;
      }
      path.push(str);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);
  return result;
};

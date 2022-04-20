/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const result = [];

  var backtrave = function (start, path) {
    // 开始位置到达字符串末尾，记录这一轮的结果
    if (start >= s.length) {
      result.push(path.slice());
      return;
    }
    for (let i = start; i < s.length; i++) {
      // 截取字符串
      const str = s.slice(start, i + 1);
      // 判断是否是回文
      if (isPalindrome(str.split(''))) {
        path.push(str);
      } else {
        continue;
      }
      // 后移下标
      backtrave(i + 1, path);
      path.pop();
    }
  };

  backtrave(0, []);
  return result;
};

/**
 * @param {string[]} arr
 * @return {boolean}
 */
var isPalindrome = function (arr) {
  if (arr.length === 0) {
    return false;
  }
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};

// https://leetcode-cn.com/problems/implement-strstr/

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (!needle) {
    return 0;
  }

  if (needle.length > haystack.length) {
    return -1;
  }

  let stackIndex = 0;
  let needleIndex = 0;

  while (stackIndex < haystack.length) {
    for (let index = stackIndex; index < haystack.length; index++) {
      if (haystack[index] === needle[needleIndex]) {
        // 如果找到了最后一个，直接返回栈的索引位置
        if (needleIndex === needle.length - 1) {
          return stackIndex;
        } else {
          needleIndex++;
          continue;
        }
      } else {
        stackIndex++;
        needleIndex = 0;
        break;
      }
    }
  }

  return -1;
};

console.log(strStr("hello", "ll"));
console.log(strStr("aaaaa", "bba"));
console.log(strStr("", ""));
console.log(strStr("aaa", "aaaa"));
console.log(strStr("mississippi", "issip"));

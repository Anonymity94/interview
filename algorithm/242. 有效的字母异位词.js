// https://leetcode-cn.com/problems/valid-anagram/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const stringMap = {};

  if (s.length !== t.length) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    const el = s[i];
    stringMap[el] = (stringMap[el] || 0) + 1;
  }

  for (let i = 0; i < t.length; i++) {
    const el = t[i];
    // s 中不存在 t 的某一个字符
    if (!stringMap.hasOwnProperty(el)) {
      return false;
    }
    // 存在的话就数量-1
    stringMap[el] -= 1;
  }

  // 判断 stringMap value 是否全为0
  return Object.values(stringMap).every((el) => el === 0);
};

console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("rat", "car"));
